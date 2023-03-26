from django.db import models

class Audit(models.Model):
    id = models.IntegerField(primary_key=True)
    action = models.CharField(max_length=30)
    user = models.CharField(max_length=100)
    table = models.CharField(max_length=100)
    created = models.DateTimeField()


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    login = models.CharField(max_length=30)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)


class Doctor(models.Model):
    id = models.IntegerField(primary_key=True)
    birthdate = models.DateField()
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    userid = models.BigIntegerField()


class Patient(models.Model):
    id = models.SmallIntegerField(primary_key=True)
    gender = models.CharField(max_length=1)
    insurance = models.CharField(max_length=16)
    passport = models.CharField(max_length=200)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    created = models.DateTimeField(auto_now_add=True)
    birthdate = models.DateField()
    userid = models.BigIntegerField()


class Diagnosis(models.Model):
    id = models.IntegerField(primary_key=True)
    patientid = models.BigIntegerField()
    doctorid = models.BigIntegerField()
    disease = models.CharField(max_length=1000)
    visitdate = models.DateTimeField(auto_now_add=True)


class Room(models.Model):
    id = models.IntegerField(primary_key=True)
    number = models.BigIntegerField()
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)


class Schedule(models.Model):
    doctorid = models.BigIntegerField()
    roomid = models.BigIntegerField()
    id = models.IntegerField(primary_key=True)
    worktime = models.CharField(max_length=100)
    days = models.CharField(max_length=50)
