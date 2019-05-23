# swp-final-example

1. Go to https://console.cloud.google.com
1. Create new project in google cloud platform
1. gcloud config set project <project-id> -> Updated property [core/project]
1. gcloud auth application-default login -> Credentials saved to file: 
1. gcloud auth configure-docker -> Docker configuration file updated
1. docker build -t gcr.io/<project-id>/twitter-backend:v1 . -> Successfully built
1. docker push gcr.io/<project-id>/twitter-backend:v1 -> May need to enable API
1. Go to Google Cloud Platform then search Container Registry
1. Click on the top-left page, go to Kubernetes Engine then Create Cluster
1. gcloud container clusters get-credentials <cluster-name> --zone us-central1-a --project <project-id> -> kubeconfig entry generated for <cluster-name>.
1. kubectl run <anything> --image=gcr.io/<project-id>/twitter-backend:v1 --port 4000 -> deployment.apps/<anything> created
1. kubectl get pods -> STATUS running
1. kubectl expose deployment <anything> --type=LoadBalancer --port 80 --target-port 4000 -> exposed
1. kubectl get services then change endpoint ip in frontend following by <anything>
1. Go to frontend folder and then npm start -> No need to run backend
1. Do it again with frontend, change Dockerfile then npm run-script build
1. docker build -t gcr.io/<project-id>/twitter-frontend:v1 . -> Successfully built
1. docker push gcr.io/<project-id>/twitter-frontend:v1
1. Go to Google Cloud Platform then search Container Registry

1. gcloud container clusters get-credentials <cluster-name> --zone us-central1-a --project <project-id> -> Seem like it’s no need to run here(?)
1. kubectl run <anything> --image=gcr.io/<project-id>/twitter-frontend:v1 --port 5000
1. kubectl get pods
1. kubectl expose deployment <anything> --type=LoadBalancer --port 80 --target-port 5000
1. kubectl get services then open the port following by <anything>