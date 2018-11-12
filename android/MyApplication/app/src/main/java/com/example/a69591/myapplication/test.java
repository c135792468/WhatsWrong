package com.example.a69591.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import java.io.UnsupportedEncodingException;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.android.volley.toolbox.StringRequest;
import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class test extends AppCompatActivity {
    ArrayList<String> sid;
    int age;
    String gender;
    TextView tx;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        if (getIntent().hasExtra("get_id")) {
            sid = (ArrayList<String>) getIntent().getSerializableExtra("get_id");
        }
        if (getIntent().hasExtra("get_age")) {
            age = (int) getIntent().getSerializableExtra("get_age");
        }
        if (getIntent().hasExtra("get_gender")) {
            gender = (String) getIntent().getSerializableExtra("get_gender");
        }
        tx = (TextView) findViewById(R.id.textView);
        tx.setText(age + gender);

    }
}
