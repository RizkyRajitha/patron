# NodeJs JWT Authentication API

## Using MongoDB Atlas Cluster - users collection

### Register - Validates & create new user
```
POST
/auth/register
{
    "name":"",
    "email":"",
    "password":""
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

request header: 'auth-token: a valid JWT'
```