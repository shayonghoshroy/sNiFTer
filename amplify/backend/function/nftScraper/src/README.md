### Requirements
>= Python 3.8

### Environment Setup
- Create virtual environment:
> python3 -m venv snift_env

- Activate Virtual Environment:
> source snift_env/bin/active

- Install Dependencies
> pip install -r requirements.txt

### Running FastAPI
- Start Uvicorn (FastAPI) server with hot reload
> uvicorn main:app --reload
    
-- Uvicorn should be running on 127.0.0.1:8000

### Debugging in vscode
- Click Run and Debug on side ribbon
- Click setting on upper right
- Add the following configuration:

{
>    "cwd": "${workspaceFolder}/backend",
>    "justMyCode": true,
>    "name": "Python: FastAPI",
>    "type": "python",
>    "request": "launch",
>    "module": "uvicorn",
>    "args": [
>        "main:app"
>    ]
}
    
### Docs
- View OpenAPI docs by navigating to **http://127.0.0.1:8000/docs**
