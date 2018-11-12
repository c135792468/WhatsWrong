package com.example.a69591.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.android.volley.toolbox.JsonArrayRequest;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;


//currently working on it this week
public class diagonosis extends AppCompatActivity {
    TextView diagnosis;
    ArrayList<String> symptoms;
    int age;
    String gender;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diagonosis);
        final RequestQueue queue = Volley.newRequestQueue(this);
        // getting data from MainActivity
        if (getIntent().hasExtra("get_selected")) {
            symptoms = (ArrayList<String>) getIntent().getSerializableExtra("get_selected");
        }
        if (getIntent().hasExtra("get_age")) {
             age = (int) getIntent().getSerializableExtra("get_age");
        }
        if (getIntent().hasExtra("get_gender")) {
            gender = (String) getIntent().getSerializableExtra("get_gender");
        }
        diagnosis = (TextView) findViewById(R.id.result);
        //create jsonarray
        JSONArray jd = new JSONArray();

        for (int i=0; i<symptoms.size(); i++) {
            JSONObject tjson = new JSONObject();
            try {
                tjson.put("SID", symptoms.get(i));
                tjson.put("gender", gender);
                tjson.put("age", age);
                jd.put(tjson);
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

        // covert all selected symptoms into jsonobject and store into jsonarray
        /*
        for(String symptom:symptoms){
            JSONObject tjson = new JSONObject();
            try {
                tjson.put("SID", symptom);
                tjson.put("gender", gender);
                tjson.put("age", age);
                jd.put(tjson);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        */
        String url = "http://18.191.248.57:80/diagnosis";


        JsonArrayRequest JsonArrayRequest2 = new JsonArrayRequest(Request.Method.POST, url, jd,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {


                       diagnosis.setText(response.toString());


                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                diagnosis.setText(error.toString());
            }
        });


//Add the request to the RequestQueue.
        queue.add(JsonArrayRequest2);
    }
}
