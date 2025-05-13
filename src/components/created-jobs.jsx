import { getMyJobs } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card";
import { useEffect } from "react";

const CreatedJobs = () => {
  const { user } = useUser();
  const {
    loading: loadingCreatedJobs,
    data: createJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });
  useEffect(() => {
    fnCreatedJobs();
  }, []);

  if (loadingCreatedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7d7" />;
  }

  return (
    <div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {createJobs?.length ? (
          createJobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                job={job}
                onJobSaved={fnCreatedJobs}
                isMyJob={true}
              />
            );
          })
        ) : (
          <div>No Jobs Found 😥</div>
        )}
      </div>
    </div>
  );
};

export default CreatedJobs;
