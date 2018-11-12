/*package com.example.a69591.myapplication;

import android.os.Parcelable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Button;
import android.view.View;
import android.content.Intent;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.util.ArrayList;

public class searchActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        final RequestQueue queue = Volley.newRequestQueue(this);
        // declare Button
        Button search = (Button)findViewById(R.id.search);
        // after click Button
        search.setOnClickListener(new View.OnClickListener() {
                                      @Override
                                      public void onClick(View v) {
                                          // declare text body, gender, age
                                          EditText body = (EditText) findViewById(R.id.bodypart);
                                          EditText gender = (EditText) findViewById(R.id.gender);
                                          EditText age = (EditText) findViewById(R.id.age);
                                          // change text to string and int
                                          int ag = Integer.parseInt(age.getText().toString());
                                          String body_part = body.getText().toString();
                                          String gen = gender.getText().toString();
                                          //Instantiate the RequestQueue.
                                          String url = "http://18.191.248.57:80/search";

// Request a string response from the provided URL.
                                          final JSONObject json = new JSONObject();
                                          try {
                                              json.put("search", body_part);
                                              json.put("gender", gen);
                                              json.put("age", ag);

                                          } catch (JSONException e) {
                                              e.printStackTrace();
                                          }

                                          JSONArray ja = new JSONArray();
                                          ja.put(json);
                                         // String a = json.toString();
                                          //  mTextView.setText(ja.toString());

                                          JsonArrayRequest JsonArrayRequest = new JsonArrayRequest(Request.Method.POST, url, ja,
                                                  new Response.Listener<JSONArray>() {
                                                      @Override
                                                      public void onResponse(JSONArray response) {
                                                          ArrayList<String> items = new ArrayList<String>();
                                                          // mTextView.setText(response.toString());

                                                          try {
                                                              for (int i = 0; i < response.length(); i++) {
                                                                  JSONObject jsonObject = response.getJSONObject(i);

                                                                  String SID = jsonObject.getString("SID");
                                                                  //have to check for errors or no results otherwise the program will crash
                                                                  boolean correct_noresults = "no_results".equals(SID);
                                                                  boolean py_error = "error_python_error".equals(SID);
                                                                  if (correct_noresults || py_error) {
                                                                      Log.i("err", SID);
                                                                  } else {
                                                                      String common_name = jsonObject.getString("common_name");
                                                                      items.add(common_name);
                                                                  }
                                                              }
                                                          } catch (JSONException e) {
                                                              e.printStackTrace();
                                                          }
                                                          Intent startIntent = new Intent(searchActivity.this, symptomsActivity.class);

                                                          // carry the value to symptoms screen using (key, value) pair
                                                          startIntent.putExtra("get", items);
                                                          startActivity(startIntent);


                                                      }
                                                  }, new Response.ErrorListener() {
                                              @Override
                                              public void onErrorResponse(VolleyError error) {
                                                  Log.i("err", "error");
                                              }
                                          });
                                          queue.add(JsonArrayRequest);
                                      }
                                  });
    }
}
*/
package com.example.a69591.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.widget.Button;
import android.view.View;
import android.content.Intent;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

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

public class searchActivity extends AppCompatActivity{
    RadioGroup radioGroup;
    RadioButton radioButton;
    EditText body;
    EditText age;
    boolean page;
    Button search;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        //define body, age
        body = (EditText)findViewById(R.id.bodypart);
        age = (EditText)findViewById(R.id.age);
        // input validation
        body.addTextChangedListener(input);
        age.addTextChangedListener(input);

        final RequestQueue queue = Volley.newRequestQueue(this);
        // declare Button
        search = (Button)findViewById(R.id.search);
        // after click Button
        search.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // declare text body, gender, age
                EditText body = (EditText) findViewById(R.id.bodypart);
                final EditText age = (EditText) findViewById(R.id.age);
                radioGroup = (RadioGroup) findViewById(R.id.RadioGroup);
                int id = radioGroup.getCheckedRadioButtonId();
                radioButton = findViewById(id);

                // change text to string and int
                final int age_ = Integer.parseInt(age.getText().toString());
                String body_part = body.getText().toString();
                final String gender = radioButton.getText().toString();
                //Instantiate the RequestQueue.
                String url = "http://18.191.248.57:80/search";
                // convert input to Jsonobject
                final JSONObject json = new JSONObject();
                try {
                    json.put("search", body_part);
                    json.put("gender", gender);
                    json.put("age", age_);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
                // put jsonobject into jsonarray
                JSONArray ja = new JSONArray();
                ja.put(json);
                // Request a jsonarray response from the provided URL, using post request with jsonarray input
                JsonArrayRequest JsonArrayRequest = new JsonArrayRequest(Request.Method.POST, url, ja,
                        new Response.Listener<JSONArray>() {
                            @Override
                            public void onResponse(JSONArray response) {
                                ArrayList<String> name = new ArrayList<String>();
                                ArrayList<String> sid = new ArrayList<>();
                                try {
                                    //getting jsonobject from jsonarray response
                                    for (int i = 0; i < response.length(); i++) {
                                        JSONObject jsonObject = response.getJSONObject(i);
                                        // getting the symptoms id
                                        String SID = jsonObject.getString("SID");
                                        //have to check for errors or no results otherwise the program will crash
                                        boolean correct_noresults = "no_results".equals(SID);
                                        boolean py_error = "error_python_error".equals(SID);
                                        //if error set bool page to false
                                        if (correct_noresults || py_error) {
                                            page = false;
                                        } else {
                                            page = true;
                                            //getting the sysptoms name and syptoms id store into list
                                            String common_name = jsonObject.getString("common_name");
                                            name.add(common_name);
                                            sid.add(SID);
                                        }
                                    }
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                // if bool page = true move to next screen
                                if (page){
                                    Intent startIntent = new Intent(searchActivity.this, symptomsActivity.class);
                                    // sending the data to MainActivity
                                    startIntent.putExtra("get_name", name);
                                    startIntent.putExtra("get_id", sid);
                                    startIntent.putExtra("get_gender", gender);
                                    startIntent.putExtra("get_age", age_);
                                    startActivity(startIntent);
                                }
                                // getting error message
                                else {
                                    Toast.makeText(searchActivity.this, "Check you input", Toast.LENGTH_SHORT).show();
                                }

                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.i("err", "error");
                    }
                });
                queue.add(JsonArrayRequest);
            }
        });
    }
    //input validation
    private TextWatcher input = new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            String inputbody = body.getText().toString().trim();
            String inputage = age.getText().toString().trim();
            //if empty input disable search button
            search.setEnabled(!inputbody.isEmpty() && !inputage.isEmpty());
        }

        @Override
        public void afterTextChanged(Editable s) {

        }
    };

}