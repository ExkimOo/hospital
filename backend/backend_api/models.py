from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

class Audit(models.Model):
    id = models.IntegerField(primary_key=True)
    action = models.CharField(max_length=30)
    user = models.CharField(max_length=100)
    table = models.CharField(max_length=100)
    created = models.DateTimeField()


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')

        if not password:
            raise ValueError('A password is reqiured.')

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')

        if not password:
            raise ValueError('A password is reqiured.')

        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    role = models.CharField(max_length=100)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    def __str__(self):
        return self.username


class Doctor(models.Model):
    id = models.IntegerField(primary_key=True)
    birthdate = models.DateField()
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    userid = models.ForeignKey(User, on_delete=models.PROTECT)


class Patient(models.Model):
    id = models.SmallIntegerField(primary_key=True)
    gender = models.CharField(max_length=1)
    insurance = models.CharField(max_length=16)
    passport = models.CharField(max_length=200)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    created = models.DateTimeField(auto_now_add=True)
    birthdate = models.DateField()
    userid = models.ForeignKey(User, on_delete=models.PROTECT)


class Diagnosis(models.Model):
    id = models.IntegerField(primary_key=True)
    patientid = models.ForeignKey(Patient, on_delete=models.PROTECT)
    doctorid = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    disease = models.CharField(max_length=1000)
    visitdate = models.DateTimeField(auto_now_add=True)


class Room(models.Model):
    id = models.IntegerField(primary_key=True)
    number = models.BigIntegerField()
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)


class Schedule(models.Model):
    id = models.IntegerField(primary_key=True)
    doctorid = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    roomid = models.ForeignKey(Room, on_delete=models.PROTECT)
    worktime = models.CharField(max_length=100)
    days = models.CharField(max_length=50)
