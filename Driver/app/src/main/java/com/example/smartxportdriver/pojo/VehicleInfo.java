package com.example.smartxportdriver.pojo;

import androidx.annotation.NonNull;

public class VehicleInfo {
    @NonNull
    String vehicleAdmin;
    @NonNull
    String driverName;
    @NonNull
    String driverContact;
    @NonNull
    String vehicleNo;
    @NonNull
    String password;

    String latitude;

    String longitude;

    String speed;
    @NonNull
    public String getVehicleAdmin() {
        return vehicleAdmin;
    }

    public void setVehicleAdmin(@NonNull String vehicleAdmin) {
        this.vehicleAdmin = vehicleAdmin;
    }

    @NonNull
    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(@NonNull String driverName) {
        this.driverName = driverName;
    }

    @NonNull
    public String getDriverContact() {
        return driverContact;
    }

    public void setDriverContact(@NonNull String driverContact) {
        this.driverContact = driverContact;
    }

    @NonNull
    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(@NonNull String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    @NonNull
    public String getPassword() {
        return password;
    }

    public void setPassword(@NonNull String password) {
        this.password = password;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }
}
