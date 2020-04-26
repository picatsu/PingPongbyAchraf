# eklabs.m1miaa.2019
Techno Logs about GIT and NODEJS

### Lesson
* TD 2  : GITHUB _19/12/2019_
ACHRAF LAHKIKY
YASSINE JAA 

# Node-Api-Typescript
This project was created for showing how to setup a basic node&ExpressJs  REST api .


# Screens of Swagger API Documentation

![Alt text](swaggerView.PNG?raw=true "On Start")


## Getting Started

<h3>Prerequisites</h3>
You need Nodejs Installed to be able to run this project on your machine.

<h3>Installing<h3>
<ul><li>Clone Repository</li></ul>
<pre><code>git clone git@github.com:Kiwouz/eklabs.m1miaa.2019.git </code> </pre>
<br>

<ul><li>Install Dependencies</li></ul>
<pre><code>npm install</code></pre>
<br>

<ul><li>Start Application (Development)</li></ul>
<pre><code>npm start  or  node server.ts </code></pre>
<br>




Exemple SSN utiliser dans les tests:  177023523800522


////////////////////////  POST ////////////////////////

http://localhost:3011/people/

```javascript
{   
    "lastname": "firstPost",
    "birthname": "firstPost",
    "ssn": 177023523800517
}



RES =>> 

{
    "message": "ADDED SUCCESSFULLY ",
    "DataAdded": {
        "_id": "5dfbc1904a1d2a35f86e4b50",
        "lastname": "firstPost",
        "birthname": "firstPost",
        "ssn": 177023523800517,
        "commune": "Rennes",
        "departement": "Ille-et-Vilaine",
        "pays": "FRANCE",
        "naissance": "Tue Mar 01 1977 00:00:00 GMT+0100 (GMT+01:00)",
        "__v": 0
    }
}
```


http://localhost:3011/people/


```javascript
{
    "lastname": "secondPost",
    "birthname": "secondPost",
    "ssn": 177023423800517
}

RES ==>>


{
    "message": "ADDED SUCCESSFULLY ",
    "DataAdded": {
        "_id": "5dfbc1d74a1d2a35f86e4b51",
        "lastname": "secondPost",
        "birthname": "secondPost",
        "ssn": 177023423800517,
        "commune": "Saint-André-de-Buèges",
        "departement": "Hérault",
        "pays": "FRANCE",
        "naissance": "Tue Mar 01 1977 00:00:00 GMT+0100 (GMT+01:00)",
        "__v": 0
    }
}
```


http://localhost:3011/people/

```javascript
{
    "lastname": "thirdPost",
    "birthname": "thirdPost",
    "ssn": 177023420517
}

RES ==>>

" PLEASE GIVE A VALID SSN NUMBER  "
```

http://localhost:3011/people/

```javascript
{
    "lastname": "fourthPost",
    "birthname": "fourthPost",
    "ssn": 177023423800517
}

RES ==>>

" SSN Already in DATABASE "
```




////////////////////////  GET   ////////////////////////


http://localhost:3011/people/

```javascript
[
    {
        "_id": "5dfbc1904a1d2a35f86e4b50",
        "lastname": "firstPost",
        "birthname": "firstPost",
        "ssn": 177023523800517,
        "commune": "Rennes",
        "departement": "Ille-et-Vilaine",
        "pays": "FRANCE",
        "naissance": "Tue Mar 01 1977 00:00:00 GMT+0100 (GMT+01:00)",
        "__v": 0
    },
    {
        "_id": "5dfbc1d74a1d2a35f86e4b51",
        "lastname": "secondPost",
        "birthname": "secondPost",
        "ssn": 177023423800517,
        "commune": "Saint-André-de-Buèges",
        "departement": "Hérault",
        "pays": "FRANCE",
        "naissance": "Tue Mar 01 1977 00:00:00 GMT+0100 (GMT+01:00)",
        "__v": 0
    }
]
```

http://localhost:3011/peoplebyid/5dfbc1904a1d2a35f86e4b50


```javascript
{
    "_id": "5dfbc1904a1d2a35f86e4b50",
    "lastname": "firstPost",
    "birthname": "firstPost",
    "ssn": 177023523800517,
    "commune": "Rennes",
    "departement": "Ille-et-Vilaine",
    "pays": "FRANCE",
    "naissance": "Tue Mar 01 1977 00:00:00 GMT+0100 (GMT+01:00)",
    "__v": 0
}
```

http://localhost:3011/peoplebylastname/firstPost

```javascript
{
    "_id": "5dfbc1904a1d2a35f86e4b50",
    "lastname": "firstPost",
    "birthname": "firstPost",
    "ssn": 177023523800517,
    "commune": "Rennes",
    "departement": "Ille-et-Vilaine",
    "pays": "FRANCE",
    "naissance": "Tue Mar 01 1977 00:00:00 GMT+0100 (GMT+01:00)",
    "__v": 0
}
```


http://localhost:3011/peoplebyssn/177023423800517

```javascript
{
    "_id": "5dfbc1d74a1d2a35f86e4b51",
    "lastname": "secondPost",
    "birthname": "secondPost",
    "ssn": 177023423800517,
    "commune": "Saint-André-de-Buèges",
    "departement": "Hérault",
    "pays": "FRANCE",
    "naissance": "Tue Mar 01 1977 00:00:00 GMT+0100 (GMT+01:00)",
    "__v": 0
}
```


////////////////////////  PUT   ////////////////////////

http://localhost:3011/peoplebyid/5dfbc1d74a1d2a35f86e4b51


```javascript

{
   
    "lastname": "PUTupdatedByID",
    "birthname": "PUTupdatedByID",
    "ssn": 177023423800517
 
}

RES ==>>

{
    "message": "People updated"
}
```

http://localhost:3011/people/


```javascript
{
   
    "lastname": "PUTupdatedByBody",
    "birthname": "PUTupdatedByBody",
    "ssn": 177023523800517
 
}

RES ==>>

{
    "message": "People updated"
}
```



////////////////////////  DELETE   ////////////////////////


http://localhost:3011/peoplebyid/5dfbc1904a1d2a35f86e4b50


```javascript
{
    "message": "People deleted"
}
```

http://localhost:3011/peoplebyssn/177023523800517


```javascript
{
    "message": "People deleted"
}

```




