import { Component } from '@angular/core';
import questionsinfo from './loadtest.json';

interface questionlist
{
  QNo: number;
  Ques: string;
  Opt1: string;
  Opt2: string;
  Opt3: string;
  Opt4: string;
  Answ: string;
  Expn: string
}

@Component({
  selector: 'recruit',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'recruitment test';
  questions: questionlist[] = questionsinfo;
  SubmitClicked = false; 
  radiobuttonnameopt = "";
  spanname = "";
  youranswer = "";
  yourans = "";
  correctanswer = "";
  corrans = "";
  resultnm = "";
  marksneeded = "";
  markneed = 0;
  marksobtained = "";
  markobt = 0;
  finalresult = "";
  finalres = "";
  count:number = 0;
  result:string = "";
  passingper = 0;
  
  setYourAns(QuesNo : number, SelOption :string  ){
    var labelwindow =  document.getElementById("yourans"+QuesNo) as HTMLLabelElement|null;
    if(labelwindow != null){
      labelwindow.style.color = "black";
      labelwindow.style.fontSize = "2pc";
      labelwindow.innerHTML = SelOption;

    }
  }

  clearSelAns(QuesNo : number){

    var radiogrp =  document.getElementsByName("radiogrp"+QuesNo);   
    if(radiogrp != null){
      for(var i=0;i<radiogrp.length;i++){
         var radioElmnt = radiogrp[i] as HTMLInputElement;
         radioElmnt.checked = false;
      }
    }

    var labelwindow =  document.getElementById("yourans"+QuesNo) as HTMLLabelElement|null;
    if(labelwindow != null){
      labelwindow.style.color = "red";
      labelwindow.style.fontSize = "initial";
      labelwindow.innerHTML = "Not Answered Yet!";
    }


  }


  ResetAll(){
    for(let j=1;j<=this.questions.length; j++)
    {
      this.clearSelAns(j);
    }
  }

  YourResult()
  {
    this.SubmitClicked = true;

    //Hiding the Submit & Reset Buttons
    var testsubmitted = window.document.getElementById("testsubmitted");
    if(testsubmitted != null){

      testsubmitted.style.display = "none";

    }



    for(let j=1;j<=this.questions.length; j++)
    {

    //Hide the clear button in each question
    var clearansbtn = window.document.getElementById("clearans"+j);
    if(clearansbtn != null){

      clearansbtn.style.display = "none";

    }


      // Taking "i" for 4 radio buttons in each question 
      for(let i=1;i<=4; i++)
      {  
        //for 1st radio button option
        this.radiobuttonnameopt = "radiogroup" + j + "Opt" + i;
        this.radiobuttonnameopt = this.radiobuttonnameopt.replace(/^\s+|\s+$/g,"");
        var radiooption = window.document.getElementById(this.radiobuttonnameopt) as HTMLInputElement|null;
        if(radiooption != null)
        {
          radiooption.disabled = true;
        }
      
      }
      
      //for your answer display
      //"yourans{{question.QNo}}"
      this.youranswer = "yourans" + j;
      this.youranswer = this.youranswer.replace(/^\s+|\s+$/g,"");
      var labelwindow = window.document.getElementById(this.youranswer) as HTMLLabelElement|null;     
      if(labelwindow != null)
      {

        // Retrieve your answer
        this.yourans = labelwindow.innerHTML.trim();
          
        //for correct answer display
        //"correctans{{question.QNo}}"
        this.correctanswer = "correctans" + j;
        this.correctanswer = this.correctanswer.replace(/^\s+|\s+$/g,"");
        var labelwin = window.document.getElementById(this.correctanswer) as HTMLLabelElement|null;
        if(labelwin != null)
        { 
          //Retreiving Correct Answer
          this.corrans = labelwin.innerHTML.trim();

          // === The Student Skipped the Question
          if(this.yourans == "Not Answered Yet!")
          {
            labelwindow.style.color = "orange";
            labelwindow.innerHTML = "Skipped!";
          }
          //=====checking students selected answer with correct answer
          else if (this.yourans === this.corrans)
          {
            labelwindow.innerHTML += " <label style=\" color: green; font-size: medium; \"> is Correct ! <label/>"; 
            this.count += 1;
          }
          // ===== The student selected wrong answer 
          else {
            labelwindow.innerHTML += " <label style=\" color: red; font-size: medium; \"> is Wrong ! <label/>";             
          }

        }

        //for correct answer and explanation 
        this.spanname = "answersexpn" + j;
        this.spanname = this.spanname.replace(/^\s+|\s+$/g,"");
        var spanwindow = window.document.getElementById(this.spanname) as HTMLSpanElement|null;
        if(spanwindow != null)
        {
          spanwindow.style.display = "block";
        }

      }
    }
  
    
    //=======for result calculation======(outside for loop)
    this.passingper = 0.7 * this.questions.length
    //document.write("Passing Percentage" + this.passingper);



   //=========displaying result(outside for loop)

      //for marks needed display
      //marksneededlbl
      this.marksneeded = "marksneededlbl";
      this.marksneeded = this.marksneeded.replace(/^\s+|\s+$/g,"");
      var marksneedlbl = window.document.getElementById(this.marksneeded) as HTMLLabelElement|null;
      if(marksneedlbl != null)
      { 
        this.markneed = this.passingper;
        marksneedlbl.innerHTML = this.markneed.toString();
        //document.write("Marks Needed" + markneed);
      }

      //for marks obtained display
      //marksobtainedlbl
      this.marksobtained = "marksobtainedlbl";
      this.marksobtained = this.marksobtained.replace(/^\s+|\s+$/g,"");
      var marksobtlbl = window.document.getElementById(this.marksobtained) as HTMLLabelElement|null;
      if(marksobtlbl != null)
      { 
        this.markobt = this.count;
        marksobtlbl.innerHTML = this.markobt.toString();
        //document.write("Marks Needed" + markneed);
      }

      //for result display
      //marksobtainedlbl
      this.finalresult = "resultlbl";
      this.finalresult = this.finalresult.replace(/^\s+|\s+$/g,"");
      var finalreslbl = window.document.getElementById(this.finalresult) as HTMLLabelElement|null;
      if(finalreslbl != null)
      { 
        if(this.count >= this.passingper)
        {
          this.result = "PASS";
          finalreslbl.style.color = "green"; 
        }
       else
       {
         this.result = "FAIL"; 
         finalreslbl.style.color = "red"; 
        }    
        finalreslbl.innerHTML = this.result;
        //document.write("Marks Needed" + markneed);
      }

    //=======for final result======(outside for loop)
   
    this.resultnm = "resultdecn";
    this.resultnm = this.resultnm.replace(/^\s+|\s+$/g,"");
    var finalresult = window.document.getElementById(this.resultnm) as HTMLParagraphElement|null;
    if(finalresult != null)
    {
      finalresult.style.display = "block";
    } 
  
  }
 
}