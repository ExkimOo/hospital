from django.contrib import admin

from backend_api.models import *

for model in [Audit, Diagnosis, User, Room, Doctor, Schedule, Patient]:
    admin.site.register(model)