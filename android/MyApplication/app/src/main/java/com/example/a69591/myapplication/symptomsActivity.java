package com.example.a69591.myapplication;
import java.util.ArrayList;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Button;
import android.widget.Toast;
import android.widget.ListView;
import android.view.View;

public class symptomsActivity extends Activity {
    ArrayList<String> name;
    ArrayList<String> sid;
    ArrayList<String> selected;
    Button submit;
    int age;
    String gender;
    ListView chl;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_symptoms);
        //create an instance of ListView
        chl = (ListView) findViewById(R.id.checkable_list);
        //set multiple selection mode
        chl.setChoiceMode(ListView.CHOICE_MODE_MULTIPLE);
        getdata();
        selectSymptoms();
        ArrayAdapter<String> aa=new ArrayAdapter<String>(this,R.layout.checkable_list_layout,R.id.txt_title,name);
        chl.setAdapter(aa);
        Submit();
    }

    /* getting data from MainActivity
       post: store data into list
     */
    public void getdata() {
        if (getIntent().hasExtra("get_name")) {
            name = (ArrayList<String>) getIntent().getSerializableExtra("get_name");
        }
        if (getIntent().hasExtra("get_id")) {
            sid = (ArrayList<String>) getIntent().getSerializableExtra("get_id");
        }
        if (getIntent().hasExtra("get_age")) {
            age = (int) getIntent().getSerializableExtra("get_age");
        }
        if (getIntent().hasExtra("get_gender")) {
            gender = (String) getIntent().getSerializableExtra("get_gender");
        }
    }

    /*insert selected symptoms into a arraylist
      pre: User click on a symptom
      post: store symptom into a list. If symptom already in the list remove symptom
     */
    public void selectSymptoms() {
        //create an ArrayList object to store selected items
        selected=new ArrayList<String>();
        //set OnItemClickListener
        chl.setOnItemClickListener(new OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // selected item position
                int index = position;
                // add or remove selected symptoms id to selected list
                if (selected.contains(sid.get(index)))
                    selected.remove(sid.get(index)); //remove deselected item from the list of selected items
                else
                    selected.add(sid.get(index)); //add selected item to the list of selected items

            }

        });
    }
    /* onclick submit button.
       pre: First check if any symptoms is selected
       post: if so pass the list to diagonosisActivity else ask user to select symptoms
      */
    public void Submit(){
        // create instance of button
        submit = (Button) findViewById(R.id.submits);
        // on click button
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // if nothing is selected
                if (selected.isEmpty()) {
                    Toast.makeText(symptomsActivity.this, "Please select one or more symptoms", Toast.LENGTH_LONG).show();
                } else {
                    //send selected symptoms to diagonosisActivity
                    Intent startIntent = new Intent(symptomsActivity.this, diagonosis.class);
                    startIntent.putExtra("get_selected", selected);
                    startIntent.putExtra("get_age", age);
                    startIntent.putExtra("get_gender", gender);
                    startActivity(startIntent);
                }
            }
        });

    }


}