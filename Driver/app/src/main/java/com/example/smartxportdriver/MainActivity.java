package com.example.smartxportdriver;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.smartxportdriver.contstants.MyNode;
import com.example.smartxportdriver.pojo.VehicleInfo;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;

public class MainActivity extends AppCompatActivity {
    EditText etname,etcontact,etpwd;
    Button btsignup, btlogin;
    DatabaseReference databaseReference;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        etcontact=findViewById(R.id.etcontact);
        etpwd=findViewById(R.id.etpwd);


        btlogin=findViewById(R.id.btlogin);
        FirebaseDatabase.getInstance().setPersistenceEnabled(true);
        databaseReference = FirebaseDatabase.getInstance().getReference(MyNode.VEHICLE_INFO);

        btlogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.i("driverContact:",etcontact.getText().toString());
                Query query=databaseReference.orderByChild("driverContact").equalTo(etcontact.getText().toString());
                query.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                        for (DataSnapshot data : dataSnapshot.getChildren()) {
                            VehicleInfo vi=data.getValue(VehicleInfo.class);
                            if(vi.getPassword().equals(etpwd.getText().toString())) {
                                SharedPreferences.Editor prefsEditor =MainActivity.this.getSharedPreferences("eyetrack", MODE_PRIVATE).edit();
                                Gson gson = new Gson();
                                String json = gson.toJson(vi);
                                prefsEditor.putString("driver", json);
                                prefsEditor.commit();

                                Toast.makeText(MainActivity.this, "Login successful", Toast.LENGTH_SHORT).show();
                                databaseReference.removeEventListener(this);
                                Intent intent=new Intent(MainActivity.this,ActivityDashboard.class);
                                startActivity(intent);
                            }
                            else
                            {
                                VehicleInfo v=new VehicleInfo();
                                SharedPreferences.Editor prefsEditor = getSharedPreferences("eyetrack", MODE_PRIVATE).edit();
                                Gson gson = new Gson();
                                String json = gson.toJson(v);
                                prefsEditor.putString("driver", json);
                                prefsEditor.commit();
                                databaseReference.removeEventListener(this);

                                Toast.makeText(MainActivity.this, "Invalid user", Toast.LENGTH_SHORT).show();

                            }
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError databaseError) {

                    }
                });

            }
        });


    }
}