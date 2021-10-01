# ssau-db
## Install
#### 1. backend
```bash
cd backend
npm install
npm start
```
#### 2. frontend
```bash
cd frontend
npm install
npm start
```
## Backend API
#### Get list of all recipes
```
GET /recipes/
```
Response
```
[
    {
        "id": 1,
        "name": "Борщ",
        "category": "Суп"
    },
    ...
]
```

<br>

#### Get list of recipes by category
Request
```
GET /recipes?categories={list of categories}
```
Response as in the example above

<br>

#### Get list of recipes by ingredients
Request
```
GET /recipes?ingredients={list of ingredients}
```
Response as in the example above

<br>

#### Get list of recipes by category and ingredients
Request
```
GET /recipes?categories={list of categories}&ingredients={list of ingredients}
```
Response as in the example above

<br>

#### Get recipe by id
Request
```
GET /recipes/{id}
```
Response
```
[
    {
        "id": 1,
        "name": "Борщ",
        "category": "Суп",
        "text": "Взять {5} картофеля, {6} моркови, сварить.",
        "ingredients": [
            {
                "id": 5,
                "number": 50,
                "unit": "гр."
            },
            ...
        ]
    }
]
```

<br>

#### Get list of all categories
Request
```
GET /categories/
```
Response
```
[
    {
        "id": 1,
        "name": "Супы"
    },
    ...
]
```

<br>

#### Get list of all ingredients
Request
```
GET /ingredients/
```
Response
```
[
    {
        "id": 1,
        "name": "Соль"
    },
    ...
]
```