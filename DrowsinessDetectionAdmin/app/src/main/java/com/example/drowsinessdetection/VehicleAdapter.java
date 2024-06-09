package com.example.drowsinessdetection;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;

import com.example.drowsinessdetection.pojo.VehicleInfo;
import com.google.firebase.database.DatabaseReference;

import java.util.ArrayList;

public class VehicleAdapter extends ArrayAdapter<String> {
    public static int flg=0;
    private final Activity context;
    // StorageReference storageReference;
    DatabaseReference databaseReference;

    ArrayList<VehicleInfo> vilist=new ArrayList<VehicleInfo>();

    public VehicleAdapter(@NonNull Activity context, ArrayList<VehicleInfo> vilist) {
        super(context, R.layout.list_view);

        // TODO Auto-generated constructor stub
        this.context= context;
        this.vilist=vilist;

    }
    @Override
    public int getCount() {
        return vilist.size();
    }

    public View getView(int position, View view, ViewGroup parent) {
        LayoutInflater inflater=context.getLayoutInflater();
        @SuppressLint("ViewHolder") View rowView=inflater.inflate(R.layout.list_view, null,true);

        TextView txtname = (TextView) rowView.findViewById(R.id.textView1);
        TextView txtcontact = (TextView) rowView.findViewById(R.id.textView2);
        TextView txtvehicleno = (TextView) rowView.findViewById(R.id.textView3);
        TextView txtpassword = (TextView) rowView.findViewById(R.id.textView4);

        ImageView imageView=(ImageView)rowView.findViewById(R.id.image);
        imageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(view.getContext(), LocationMap.class);
                LocationMap.pj=vilist.get(position);
                view.getContext().startActivity(intent);
            }
        });
        VehicleInfo vehicleInfo=vilist.get(position);

        txtname.setText(vehicleInfo.getDriverName());
        txtcontact.setText(vehicleInfo.getDriverContact());
        txtvehicleno.setText(vehicleInfo.getVehicleNo());
        txtpassword.setText(vehicleInfo.getPassword());

        return rowView;
    };
}