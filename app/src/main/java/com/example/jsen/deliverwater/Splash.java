package com.example.jsen.deliverwater;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.RotateAnimation;
import android.view.animation.ScaleAnimation;

import com.example.jsen.deliverwater.weex.extend.module.SimpleStore;
import com.taobao.weex.common.Constants;

import java.util.Calendar;
import java.util.Date;

import static com.example.jsen.deliverwater.weex.extend.module.WXNavigatorModule.INSTANCE_ID;
import static com.example.jsen.deliverwater.weex.extend.module.WXNavigatorModule.WEEX;

/**
 * Created by jsen on 2017/12/24.
 */

public class Splash extends AppCompatActivity {

    boolean isLogin = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        View textView = findViewById(R.id.fullscreen_content);
        ScaleAnimation scaleAnimation = new ScaleAnimation(0.0f, 1.0f, 0.0f, 1.0f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f);
        RotateAnimation rotateAnimation = new RotateAnimation(0f, 360f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f);

        AnimationSet animationSet = new AnimationSet(false);
        animationSet.addAnimation(scaleAnimation);
        animationSet.addAnimation(rotateAnimation);
        animationSet.setDuration(1500);

        String userkey = SimpleStore.getString(this, "userKey");
        String time = SimpleStore.getString(this, "time");
        if (!TextUtils.isEmpty(userkey) && !TextUtils.isEmpty(time)) {
            Date date = new Date(Long.parseLong(time));
            if(differentDays(date, new Date(System.currentTimeMillis())) <= 7) {
                isLogin = false;
            }
        }

        animationSet.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {
            }

            @Override
            public void onAnimationEnd(Animation animation) {
                if (isLogin) {
                    startActivity(new Intent(Splash.this, Login.class));
                } else {

                    Uri rawUri = Uri.parse("file://assets/dist/main.js");
                    String scheme = rawUri.getScheme();
                    Uri.Builder builder = rawUri.buildUpon();
                    if (TextUtils.isEmpty(scheme)) {
                        builder.scheme(Constants.Scheme.HTTP);
                    }
                    Intent intent = new Intent(Intent.ACTION_VIEW, builder.build());
                    intent.addCategory(WEEX);
                    startActivity(intent);
                }
                finish();
            }

            @Override
            public void onAnimationRepeat(Animation animation) {
            }
        });
        textView.startAnimation(animationSet);
    }

    /**
     * date2比date1多的天数
     * @param date1
     * @param date2
     * @return
     */
    public static int differentDays(Date date1,Date date2) {
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);

        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);
        int day1= cal1.get(Calendar.DAY_OF_YEAR);
        int day2 = cal2.get(Calendar.DAY_OF_YEAR);

        int year1 = cal1.get(Calendar.YEAR);
        int year2 = cal2.get(Calendar.YEAR);
        if(year1 != year2)   //同一年
        {
            int timeDistance = 0 ;
            for(int i = year1 ; i < year2 ; i ++)
            {
                if(i%4==0 && i%100!=0 || i%400==0)    //闰年
                {
                    timeDistance += 366;
                }
                else    //不是闰年
                {
                    timeDistance += 365;
                }
            }

            return timeDistance + (day2-day1) ;
        }
        else    //不同年
        {
            System.out.println("判断day2 - day1 : " + (day2-day1));
            return day2-day1;
        }
    }
}
