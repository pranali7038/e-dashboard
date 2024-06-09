package com.example.drowsinessdetection;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.drowsinessdetection.constants.MyNode;
import com.example.drowsinessdetection.pojo.Personal_Info;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;

public class Login extends AppCompatActivity {
    EditText etname,etcontact,etemail,etpwd;
    Button btsignup, btlogin;
    TextView tvForgotPWd;
    DatabaseReference databaseReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etcontact=findViewById(R.id.etcontact);
        etpwd=findViewById(R.id.etpwd);
        btsignup=findViewById(R.id.btAdd);
        btlogin=findViewById(R.id.btlogin);

        databaseReference = FirebaseDatabase.getInstance().getReference(MyNode.VEHICLE_ADMIN);

        btlogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Query query=databaseReference.orderByChild("contact").equalTo(etcontact.getText().toString());
                query.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                        for (DataSnapshot data : dataSnapshot.getChildren()) {
                            Personal_Info pi=data.getValue(Personal_Info.class);
                            if(pi.getPassword().equals(etpwd.getText().toString())) {
                                SharedPreferences.Editor prefsEditor =Login.this.getSharedPreferences("eyetrack", MODE_PRIVATE).edit();
                                Gson gson = new Gson();
                                String json = gson.toJson(pi);
                                prefsEditor.putString("admin", json);
                                prefsEditor.commit();

                                Toast.makeText(Login.this, "Login sucessfull", Toast.LENGTH_SHORT).show();
                                databaseReference.removeEventListener(this);
                                Intent intent=new Intent(Login.this,Dashboard.class);
                                startActivity(intent);
                            }
                            else
                            {
                                Personal_Info vi=new Personal_Info();
                                SharedPreferences.Editor prefsEditor = getSharedPreferences("eyetrack", MODE_PRIVATE).edit();
                                Gson gson = new Gson();
                                String json = gson.toJson(vi);
                                prefsEditor.putString("admin", json);
                                prefsEditor.commit();
                                databaseReference.removeEventListener(this);

                                Toast.makeText(Login.this, "Invalid user", Toast.LENGTH_SHORT).show();

                            }
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError databaseError) {

                    }
                });

            }
        });

        btsignup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(Login.this,Register.class);
                startActivity(intent);
            }
        });

    }
}