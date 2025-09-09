from django.db import models

# Create your models here.
class Signup(models.Model):
    ROLE_CHOICES=[
        ('Farmer','Farmer'),
        ('Buyer','Buyer'),
        ('Admin','Admin'),
    ]
    userid=models.AutoField(primary_key=True)
    username=models.CharField(max_length=150,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255) 
    mobilenumber = models.CharField(max_length=15, unique=True, blank=False, null=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Farmer')
    def __str__(self):
        return self.username


class Crop(models.Model):
    CROP_TYPES = [
        ('cereal', 'Cereal'),
        ('fruit', 'Fruit'),
        ('vegetable', 'Vegetable'),
        ('pulse', 'Pulse'),
        ('seed','Seed'),
    ]
    cropid=models.AutoField(primary_key=True)
    farmer_name = models.CharField(max_length=100)
    crop_type = models.CharField(max_length=20, choices=CROP_TYPES)
    description = models.TextField(blank=True)
    price_per_kg = models.DecimalField(max_digits=10, decimal_places=2)
    contact_number = models.CharField(max_length=15)
    image = models.ImageField(upload_to='crops/',default='crops/image7.jpg')


    def __str__(self):
        return f"{self.crop_type} - {self.farmer_name}"
    

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
    ]

    buyer = models.ForeignKey(Signup, on_delete=models.CASCADE)
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE)
    seller_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price_per_unit = models.FloatField()
    total_amount = models.FloatField()
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    order_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.total_amount = self.quantity * self.price_per_unit
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.crop.crop_type} - {self.buyer.username} ({self.status})"
    

