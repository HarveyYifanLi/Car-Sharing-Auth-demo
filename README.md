## Car-Sharing-Auth-demo
### Screenshots from the completed App
![Test image](https://github.com/HarveyYifanLi/Car-Sharing-Auth-demo/blob/main/LogIn.png)
![Test image](https://github.com/HarveyYifanLi/Car-Sharing-Auth-demo/blob/main/SignUp.png)
![Test image](https://github.com/HarveyYifanLi/Car-Sharing-Auth-demo/blob/main/Cars-Logout.png)
![Test image](https://github.com/HarveyYifanLi/Car-Sharing-Auth-demo/blob/main/Main.png)

### Functionalities and Tech Stack
* This is a full stack JavaScript Web SPA
* Frondend: React.js framework with Redux for state management
* Backend: Express.js framework in Node.js runtime engine
* Database: MongoDB non-relational database
* Security: User Authentication + Authorization using a combination of bcrypt.js and Json-Web-Token (JWT) 
* In-memory Caching: Redis in-memory Caching is being implemented on the API endpoint with the most traffic (i.e. /api/cars)
* GraphQL querying endpoint integrated at route `/graphql`

### Software Architecture: Microservices Pattern with `Docker` and `Kubernetes`
* Container Orchestration files using `Kubernetes` are located within `/resource-manifests`

* An example of the whole app running under a `Kubernetes` managed `Cluster` running locally:

![image](https://user-images.githubusercontent.com/17951024/230801283-67cf52e4-a010-49f9-bdab-e7bd7a7ec4dd.png)

### Also integrated `GraphQL` to two of the major backend APIs in querying cars

* An example of accessing the  `/graphql` endpoint, aka the GraphiQL playground, once the whole app is up:

![image](https://user-images.githubusercontent.com/17951024/233868419-781e61cf-4972-4749-b7b4-dfc90bb7a769.png)

