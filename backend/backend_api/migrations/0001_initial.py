# Generated by Django 4.1.7 on 2023-03-26 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Audit',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('action', models.CharField(max_length=30)),
                ('user', models.CharField(max_length=100)),
                ('table', models.CharField(max_length=100)),
                ('created', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Diagnosis',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('patientid', models.BigIntegerField()),
                ('doctorid', models.BigIntegerField()),
                ('disease', models.CharField(max_length=1000)),
                ('visitdate', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('birthdate', models.DateField()),
                ('name', models.CharField(max_length=100)),
                ('specialization', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('userid', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.SmallIntegerField(primary_key=True, serialize=False)),
                ('gender', models.CharField(max_length=1)),
                ('insurance', models.CharField(max_length=16)),
                ('passport', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=15)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('birthdate', models.DateField()),
                ('userid', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('number', models.BigIntegerField()),
                ('name', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('doctorid', models.BigIntegerField()),
                ('roomid', models.BigIntegerField()),
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('worktime', models.CharField(max_length=100)),
                ('days', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('login', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=50)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
    ]
