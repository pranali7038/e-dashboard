package com.example.drowsinessdetection;
import androidx.appcompat.app.AppCompatActivity;


import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.ImageView;
import android.widget.ViewFlipper;

public class MainActivity extends AppCompatActivity{
    ViewFlipper viewFlipper;
    String[] Names={"",""};
    int[] IMAGES={R.drawable.car1,R.drawable.car2};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        viewFlipper=findViewById(R.id.vf);
        for(int images:IMAGES)
        {
            fliper(images);
        }

        Handler handler=new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent=new Intent(MainActivity.this,Login.class);
                startActivity(intent);
                finish();
            }
        },4000);
    }
    public void fliper(int image)
    {
        ImageView imageView=new ImageView(MainActivity.this);
        imageView.setBackgroundResource(image);
        viewFlipper.addView(imageView);
        viewFlipper.setFlipInterval(2000);
        viewFlipper.setAutoStart(true);
        viewFlipper.setInAnimation(MainActivity.this, android.R.anim.slide_out_right);
        viewFlipper.setInAnimation(MainActivity.this, android.R.anim.slide_out_right);

    }
}