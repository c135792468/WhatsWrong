package com.example.a69591.myapplication;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;

//currently working on it this week
public class diagonosis extends AppCompatActivity {
    ArrayList<String> symptoms;
    ArrayList<String> diagonosis;
    ArrayList<String> common_name;
    ListView listView;
    int age;
    String gender;
    TextView text;
    String name;
    String def;
    RequestQueue queue;
    RequestQueue queue2;
    Button back;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diagonosis);
        listView = (ListView) findViewById(R.id.list);
        back = (Button) findViewById(R.id.back);
        diagonosis = new ArrayList<String>();
        common_name = new ArrayList<>();
        text = (TextView) findViewById(R.id.text);
        // calls the getdata function that get the data for selected symptoms from symptomsActivity
        getdata();
        JSONArray selectedSymptoms = json(symptoms, gender, age);
        queue = Volley.newRequestQueue(this);
        queue2 = Volley.newRequestQueue(this);
        DiagonosisApiRequest(selectedSymptoms);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent startIntent = new Intent(diagonosis.this, MainActivity.class);
                startActivity(startIntent);
            }
        });
    }


    /* getting data from SymptomsActivity
       post: store data into list
     */
    public void getdata() {
        if (getIntent().hasExtra("get_selected")) {
            symptoms = (ArrayList<String>) getIntent().getSerializableExtra("get_selected");
        }
        if (getIntent().hasExtra("get_age")) {
            age = (int) getIntent().getSerializableExtra("get_age");
        }
        if (getIntent().hasExtra("get_gender")) {
            gender = (String) getIntent().getSerializableExtra("get_gender");
        }
    }

    /* convert symptoms, gender, age into jsonarray form
        pre: @param gender, age, and a list of symptoms
        post: return JsonArray
     */
    public JSONArray json(ArrayList<String> symptoms, String gender, int age) {
        //create jsonarray
        JSONArray selectedSymptoms = new JSONArray();
        // convert all symtoms in list into Jsonobject form and add to jsonArray
        for (int i = 0; i < symptoms.size(); i++) {
            JSONObject tjson = new JSONObject();
            try {
                tjson.put("SID", symptoms.get(i));
                tjson.put("gender", gender);
                tjson.put("age", age);
                selectedSymptoms.put(tjson);
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
        return selectedSymptoms;
    }

    /*make a post reuqest to the the backend that return a Jsonarray of diagonosis
      pre: @param a JsonArray of selected Symptoms
      post: return JsonArray of diagnosis
     */
    public void DiagonosisApiRequest(JSONArray selectedSymptoms) {
        String url = "http://18.191.248.57:80/diagnosis";
        final JsonArrayRequest JsonArrayRequest2 = new JsonArrayRequest(Request.Method.POST, url, selectedSymptoms,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for (int i = 0; i < response.length(); i++) {
                                JSONObject jsonObject = response.getJSONObject(i);
                                name = jsonObject.getString("common_name");
                                String probability = jsonObject.getString("probability");
                                double probability_ = Double.parseDouble(probability);
                                probability_ = probability_*100;
                                JSONObject com_name = new JSONObject();
                                final JSONArray jsonA = new JSONArray();
                                try {
                                    com_name.put("dict", name);
                                    jsonA.put(com_name);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                // calls the dictionaryApiRequest function
                                dictionaryApiRequest(jsonA, probability_, name);
                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }

                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                ArrayList<String> diagonosis = new ArrayList<String>();
                diagonosis.add(error.toString());
            }
        });
//Add the request to the RequestQueue.
        queue.add(JsonArrayRequest2);
    }

    /* calls the dictionaryApo from backend
       pre: @param probability, name, and JsonArray of diagnosis
       post: return a JsonArray of definition
     */
    public void dictionaryApiRequest(final JSONArray jsonA, final double probability, final String name) {
        String url2 = "http://18.191.248.57:80/dct";
        JsonArrayRequest JsonArrayRequest3 = new JsonArrayRequest(Request.Method.POST, url2, jsonA,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        for (int i = 0; i < response.length(); i++) {
                            try {
                                JSONObject jsonObject = response.getJSONObject(i);
                                def = jsonObject.getString("def");
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                        diagonosis.add("common_name: " + name + ". With probability: " + probability + ". definition: " + def);
                        ArrayAdapter aa = new ArrayAdapter<String>(diagonosis.this, android.R.layout.simple_list_item_1, android.R.id.text1, diagonosis);
                        listView.setAdapter(aa);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }

        });

        queue2.add(JsonArrayRequest3);
    }
}
