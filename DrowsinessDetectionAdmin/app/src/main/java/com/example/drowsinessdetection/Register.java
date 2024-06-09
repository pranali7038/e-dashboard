package com.example.drowsinessdetection;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.drowsinessdetection.constants.MyNode;
import com.example.drowsinessdetection.pojo.Personal_Info;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

public class Register extends AppCompatActivity{
    EditText etname,etcontact,etemail,etpwd;
    Button btsignup, btlogin;
    DatabaseReference databaseReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        etname=findViewById(R.id.etname);
        etcontact=findViewById(R.id.etcontact);
        etemail=findViewById(R.id.etemail);
        etpwd=findViewById(R.id.etpwd);

        btsignup=findViewById(R.id.btAdd);

        databaseReference = FirebaseDatabase.getInstance().getReference(MyNode.VEHICLE_ADMIN);  //use to store data to cloude

        btsignup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                boolean flag=false;
                if(etname.getText().toString().equalsIgnoreCase(""))
                {
                    etname.setError("Enter name");
                    flag=true;
                }
                if(etemail.getText().toString().equalsIgnoreCase("")==false &&etemail.getText().toString().contains("@")==false && etemail.getText().toString().contains(".") ==false)
                {
                    etemail.setError("Enter valid email");
                    flag=true;
                }
                if(etcontact.getText().toString().length()!=10)
                {
                    etcontact.setError("Enter valid contact");
                    flag=true;
                }

                if(flag)
                {
                    return;
                }

                Personal_Info pi=new Personal_Info();
                pi.setContact(etcontact.getText().toString());
                pi.setName(etname.getText().toString());
                pi.setEmail(etemail.getText().toString());
                pi.setPassword(etpwd.getText().toString());

                Query query=databaseReference.orderByChild("contact").equalTo(etcontact.getText().toString());
                query.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                        int flg=0;
                        for (DataSnapshot data : dataSnapshot.getChildren()) {
                            Personal_Info pi=data.getValue(Personal_Info.class);

                            flg=1;


                        }
                        if(flg==0)
                        {
                            databaseReference.removeEventListener(this);
                            databaseReference.child(pi.getContact()).setValue(pi, new DatabaseReference.CompletionListener() {
                                @Override
                                public void onComplete(DatabaseError databaseError, DatabaseReference dr) {
                                    Toast.makeText(Register.this, "Registration done "+dr.getKey(), Toast.LENGTH_SHORT).show();
                                    Intent intent=new Intent(Register.this, Login.class);
                                    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK|Intent.FLAG_ACTIVITY_NEW_TASK);
                                    startActivity(intent);
                                }
                            });
                        }
                        else {
                            Toast.makeText(Register.this, "User already registered", Toast.LENGTH_SHORT).show();
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