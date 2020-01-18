# NodeJs JWT Authentication API

## Using MongoDB Atlas Cluster - users collection

### Register - Validates & create new Requester

### Sends the new user a welcome Email

```
POST
/reg/registerRequester
{
    "firstName":"",
    "email":"",
    "password":"",
    "nic":""
}
```

### Login - returns a JWT

```
POST
/auth/login
{
    "email":"",
    "password":""
}
```

### Private routes - Can be accessed only via presenting valid token inside 'auth-token' custom header

```
test private Route:
/get

request header: 'Authorization':' a valid JWT'
```

### Api routes for Requester

add new post by Rquestor (private Route):

### api/newpost POST

```
{
"title":"",
"description": "",
"estimatedBudget": "",
"donationTypeAccepted":""
}


request header: 'Authorization':' a valid JWT'
```

add new post by Rquestor (private Route):

### upload/newpostfiles POST

```
{
"resobj":"files to be send",

}

request header: 'Authorization':' a valid JWT'
```

add new post by Rquestor (private Route):

### api/getposts GET

```

request header: 'Authorization':' a valid JWT'

```
