const User = require("./user");

// Read a user by email

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });

    //if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

// Read a profile by user ID

const getProfileByUserId = async (userId) => {
  try {
    console.log("Fetching profile for userId", userId);

    //fetch profile and populate fields from the user schema

    const profile = await User.findOne({ _id: userId });

    // .populate({

    //   path: 'userId',   //populate user-related data

    //   select: 'email password',   //include email and password fields

    // });

    if (!profile) throw new Error("Profile not found");

    return profile;
  } catch (error) {
    throw new Error("Error fetching profile: " + error.message);
  }
};

// Update a profile by user ID

const updateProfile = async (userId, updateData) => {
  console.log(updateData);

  try {
    const updatedProfile = await User.updateOne(
      { _id: userId },

      updateData,

      { new: true }
    );

    //if (!updatedProfile) throw new Error('Profile not found');

    return updatedProfile;
  } catch (error) {
    throw new Error("Error updating profile: " + error.message);
  }
};

const createJobPost = async (userId, jobPostDetails) => {
  const recruiter = await User.findById(userId);

  if (!recruiter || recruiter.role !== "recruiter") {
    throw new Error("Only recruiters can create job posts");
  }

  const newJobPost = {
    title: jobPostDetails.title,

    description: jobPostDetails.description,

    skillsRequired: jobPostDetails.skillsRequired,

    jobType: jobPostDetails.jobType,

    companyCulture: jobPostDetails.companyCulture,

    salaryRange: jobPostDetails.salaryRange,
  };

  recruiter.jobPosts.push(newJobPost);

  await recruiter.save();

  return newJobPost;
};

const applyForJob = async (userId, jobPostId) => {
  const jobSeeker = await User.findById(userId);

  if (!jobSeeker || jobSeeker.role !== "jobSeeker") {
    throw new Error("Only job seekers can apply for job posts");
  }

  const recruiter = await User.findOne({
    "jobPosts._id": jobPostId,
    role: "recruiter",
  });

  if (!recruiter) {
    throw new Error("Job post not found");
  }

  const jobPost = recruiter.jobPosts.id(jobPostId);

  if (!jobPost) {
    throw new Error("Job post not found");
  }

  if (jobPost.appliedUsers.includes(jobSeeker._id)) {
    throw new Error("You have already applied for this job");
  }

  jobPost.appliedUsers.push(jobSeeker._id);

  await recruiter.save();

  return jobPost;
};

const findMatchingJobPosts = async (userId) => {
  const jobSeeker = await User.findById(userId);

  if (!jobSeeker || jobSeeker.role !== "jobSeeker") {
    throw new Error("User is not a job seeker");
  }

  const jobPosts = await User.aggregate([
    { $match: { role: "recruiter" } },

    { $unwind: "$jobPosts" },

    {
      $project: {
        jobPost: "$jobPosts",

        skillsMatched: {
          $size: {
            $setIntersection: ["$jobPosts.skillsRequired", jobSeeker.skills],
          },
        },

        preferencesMatched: {
          $size: {
            $setIntersection: ["$jobPosts.jobType", jobSeeker.jobPreferences],
          },
        },

        cultureMatched: {
          $size: {
            $setIntersection: [
              "$jobPosts.companyCulture",
              jobSeeker.cultureFit,
            ],
          },
        },
      },
    },

    {
      $addFields: {
        totalMatches: {
          $add: ["$skillsMatched", "$preferencesMatched", "$cultureMatched"],
        },
      },
    },

    { $sort: { totalMatches: -1 } },

    {
      $project: {
        "jobPost._id": 1,
        "jobPost.title": 1,
        "jobPost.description": 1,
        "jobPost.salaryRange": 1,
      },
    },
  ]);

  return jobPosts;
};

module.exports = {
  getUserByEmail,

  getProfileByUserId,

  updateProfile,

  createJobPost,

  applyForJob,

  findMatchingJobPosts,
};
