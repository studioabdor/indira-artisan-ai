import subprocess
import sys
import os
from pathlib import Path

def run_command(command, cwd=None):
    """Run a command and print its output"""
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, cwd=cwd, text=True)
    if result.returncode != 0:
        print(f"Error running command: {command}")
        sys.exit(1)

def setup_environment():
    """Set up the Python environment and install dependencies"""
    backend_dir = Path(__file__).parent.parent
    
    # Create and activate virtual environment
    venv_dir = backend_dir / "venv"
    if not venv_dir.exists():
        run_command(f"python -m venv {venv_dir}")
    
    # Install dependencies
    pip_cmd = f"{venv_dir}/Scripts/pip" if os.name == 'nt' else f"{venv_dir}/bin/pip"
    run_command(f"{pip_cmd} install -r {backend_dir}/requirements.txt")

def setup_database():
    """Set up the database and run migrations"""
    backend_dir = Path(__file__).parent.parent
    python_cmd = f"{backend_dir}/venv/Scripts/python" if os.name == 'nt' else f"{backend_dir}/venv/bin/python"
    
    # Initialize Alembic
    run_command(f"{python_cmd} -m alembic init alembic", cwd=backend_dir)
    
    # Create initial migration
    run_command(f"{python_cmd} -m alembic revision --autogenerate -m 'Initial migration'", cwd=backend_dir)
    
    # Run migrations
    run_command(f"{python_cmd} -m alembic upgrade head", cwd=backend_dir)
    
    # Initialize database with default data
    run_command(f"{python_cmd} app/db/init_db.py", cwd=backend_dir)

if __name__ == "__main__":
    # Run setup_env.py first
    run_command(f"{sys.executable} {Path(__file__).parent}/setup_env.py")
    
    # Set up environment and database
    setup_environment()
    setup_database()
    
    print("\nSetup completed successfully!")
    print("\nTo start the server, run:")
    print("cd backend")
    if os.name == 'nt':
        print(r"venv\Scripts\python -m uvicorn app.main:app --reload")
    else:
        print("venv/bin/python -m uvicorn app.main:app --reload") 