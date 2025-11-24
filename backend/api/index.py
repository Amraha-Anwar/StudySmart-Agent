import sys
import os
from mangum import Mangum

# Add the parent directory (backend) to sys.path so we can import 'app'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app

handler = Mangum(app)