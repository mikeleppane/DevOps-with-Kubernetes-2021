const k8s = require("@kubernetes/client-node");

const dummysiteWatchURL = "/apis/stable.dwk/v1/dummysites";
const jobWatchURL = "/apis/batch/v1/jobs";

const kc = new k8s.KubeConfig();

process.env.NODE_ENV === "development"
  ? kc.loadFromDefault()
  : kc.loadFromCluster();

const opts = {};
kc.applyToRequest(opts);
const watch = new k8s.Watch(kc);
const k8sBatchV1Api = kc.makeApiClient(k8s.BatchV1Api);
const coreApiClient = kc.makeApiClient(k8s.CoreV1Api);

const createJob = (namespace, dummysiteName, websiteUrl) => {
  const job = new k8s.V1Job();
  const spec = new k8s.V1JobSpec();
  const podSpec = new k8s.V1PodSpec();
  const podTemplateSpec = new k8s.V1PodTemplateSpec();
  const container = new k8s.V1Container();
  const metadata = new k8s.V1ObjectMeta();
  job.apiVersion = "batch/v1";
  job.kind = "Job";
  metadata.name = `dummysite-job-${idGenerator()}`;
  metadata.labels = { dummysite: dummysiteName };
  metadata.namespace = namespace;
  job.metadata = metadata;
  container.name = `dummysite-app-${idGenerator()}`;
  container.image = "mikkolep/dummysite-app:v3";
  container.args = [websiteUrl];

  podSpec.containers = [container];
  podSpec.restartPolicy = "Never";

  podTemplateSpec.spec = podSpec;
  spec.template = podTemplateSpec;
  job.spec = spec;
  return job;
};

const idGenerator = () => {
  return Math.random().toString(36).substr(2, 8);
};

const removePod = async (namespace, jobName) => {
  console.log(`Removing pod: `);
  try {
    const { body } = await coreApiClient.listNamespacedPod(namespace);
    body.items.forEach((pod) => {
      if (pod.metadata.labels["job-name"] === jobName) {
        coreApiClient.deleteNamespacedPod(pod.metadata.name, namespace);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const removeJob = async (namespace, jobName) => {
  console.log(`Deleting job: ${jobName}`);
  try {
    await k8sBatchV1Api.deleteNamespacedJob(jobName, namespace);
  } catch (error) {
    console.error(error);
  }
};

const executeDummysiteCleanUp = async (namespace, jobName) => {
  try {
    await removePod(namespace, jobName);
    await removeJob(namespace, jobName);
  } catch (error) {
    console.error(error);
  }
};

const deleteDummysite = async (namespace, dummysiteName) => {
  console.log(`Cleaning dummysite: ${dummysiteName}`);
  try {
    const { body } = await k8sBatchV1Api.listNamespacedJob(namespace);
    body.items.forEach((job) => {
      if (job.metadata.labels.dummysite === dummysiteName) {
        executeDummysiteCleanUp(namespace, job.metadata.name);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const startDummysiteWatch = () => {
  watch
    .watch(
      dummysiteWatchURL,
      {},
      (type, apiObj) => {
        if (type === "ADDED") {
          console.log("NEW DUMMYSITE OBJECT:");
          console.log("=====================");
          console.log(JSON.stringify(apiObj, null, 2));
          console.log("=====================");
          k8sBatchV1Api
            .createNamespacedJob(
              "default",
              createJob(
                "default",
                apiObj.metadata.name,
                apiObj.spec.website_url
              )
            )
            .catch((e) => console.error(e));
        } else if (type === "MODIFIED") {
          console.log("CHANGED DUMMYSITE OBJECT:");
          console.log("=====================");
          console.log(JSON.stringify(apiObj, null, 2));
          console.log("=====================");
        } else if (type === "DELETED") {
          console.log("DELETED DUMMYSITE OBJECT:");
          console.log("=====================");
          console.log(JSON.stringify(apiObj, null, 2));
          console.log("=====================");
          deleteDummysite("default", apiObj.metadata.name).catch((error) =>
            console.error(error)
          );
        }
      },
      (err) => {
        console.error(err);
      }
    )
    .catch((error) => console.error(error));
};

const startJobWatch = () => {
  watch
    .watch(
      jobWatchURL,
      {},
      (type, apiObj) => {
        if (apiObj.metadata.labels.dummysite) {
          if (type === "ADDED") {
            console.log("NEW DUMMYSITE JOB:");
            console.log("=====================");
            console.log(JSON.stringify(apiObj, null, 2));
          } else if (type === "MODIFIED") {
            console.log("MODIFIED DUMMYSITE JOB:");
            console.log("=====================");
            console.log(apiObj.status);
          } else if (type === "DELETED") {
            console.log("DELETED DUMMYSITE JOB:");
            console.log("=====================");
            console.log(JSON.stringify(apiObj, null, 2));
          } else {
            console.log("UNKNOWN TYPE: " + type);
          }
        }
      },
      (err) => {
        console.error(err);
      }
    )
    .catch((error) => console.error(error));
};

startDummysiteWatch();
startJobWatch();
