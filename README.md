## Car-Sharing-Auth-demo
### Screenshots from the completed App
![Test image](https://github.com/HarveyYifanLi/Car-Sharing-Auth-demo/blob/main/LogIn.png)
![Test image](https://github.com/HarveyYifanLi/Car-Sharing-Auth-demo/blob/main/SignUp.png)
![Test image](https://github.com/HarveyYifanLi/Car-Sharing-Auth-demo/blob/main/Cars-Logout.png)
![Test image](https://github.com/HarveyYifanLi/Car-Sharing-Auth-demo/blob/main/Main.png)

### Functionalities and Tech Stack
* This is a full stack JavaScript Web SPA
* Frondend: `React.js` framework with `Redux` for state management
* Backend: `Express.js` framework in `Node.js` runtime engine
* Database: `MongoDB` non-relational database
* Security: User Authentication + Authorization using a combination of `bcrypt.js` and `Json-Web-Token` (`JWT`) 
* In-memory Caching: `Redis` in-memory Caching is being implemented on the API endpoint with the most traffic (i.e. `/api/cars`)
* `GraphQL` querying endpoint integrated at route `/graphql`


### Software Architecture: Microservices Pattern with 3 `Dockerized` Microservices orchestrated under a `Kubernetes` Cluster
* `Container Orchestration` files using `Kubernetes` are located within `/resource-manifests`:

-> There is a `Service` and `Deployment` Kubernetes resource config `yaml` files for each of the 3 services: 
frontend `Nginx` web-server, backend `Node.js` server, and `Redis` in-memory database.

* An example of the whole system running under a `Kubernetes` Cluster locally:

![image](https://user-images.githubusercontent.com/17951024/235820376-4bbd00ec-d05a-4bb1-8e72-5e12b1d3865d.png)

### Also integrated `GraphQL` for two of the major backend APIs in querying cars

* An example of accessing the  `/graphql` endpoint, aka the `GraphiQL` playground, once the whole app is up:

![image](https://user-images.githubusercontent.com/17951024/233868419-781e61cf-4972-4749-b7b4-dfc90bb7a769.png)

