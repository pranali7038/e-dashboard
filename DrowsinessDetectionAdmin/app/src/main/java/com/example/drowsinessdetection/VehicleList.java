package com.example.drowsinessdetection;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.ListView;

import com.example.drowsinessdetection.constants.MyNode;
import com.example.drowsinessdetection.pojo.Personal_Info;
import com.example.drowsinessdetection.pojo.VehicleInfo;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;

import java.util.ArrayList;

public class VehicleList extends AppCompatActivity{
    DatabaseReference databaseReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vehicle_list);

        databaseReference= FirebaseDatabase.getInstance().getReference(MyNode.VEHICLE_INFO);

        SharedPreferences sh =VehicleList.this.getSharedPreferences("eyetrack", MODE_PRIVATE); //shared preferences allow to save and retrived  data in the form of key,value pair
        Gson gson = new Gson();
        String json=  sh.getString("admin", "");
        Personal_Info pi=gson.fromJson(json,Personal_Info.class);


        //databaseReference = FirebaseDatabase.getInstance().getReference();
        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                ArrayList<VehicleInfo> vilist=new ArrayList<VehicleInfo>();

                for (DataSnapshot data : dataSnapshot.getChildren()) {
                    VehicleInfo vehicleInfo = data.getValue(VehicleInfo.class);
                    if(pi.getContact().equals(vehicleInfo.getVehicleAdmin())) {
                        vilist.add(vehicleInfo);
                    }
                }
                VehicleAdapter adapter=new VehicleAdapter(VehicleList.this, vilist);
                ListView listView1=findViewById(R.id.listview1);
                listView1.setAdapter(adapter);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
}