import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../dialog/message/message.component";
import { ModuleService } from '../Service/module.service';
import { ProcessService } from '../Service/process.service';

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss']
})
export class ProcessPageComponent implements OnInit {

  /*	
	PROCESS_INPUT = 1
    PROCESS_LOGIC = 2
    PROCESS_OUTPUT = 3*/
  curr_projects = ['PROCESS_INPUT', 'PROCESS_LOGIC', 'PROCESS_OUTPUT'];
  curr_projects_map = { 'PROCESS_INPUT' : 1 ,  'PROCESS_LOGIC' : 2, 'PROCESS_OUTPUT' : 3, 'PROCESS_OUTPUT_FLAG': 4 };
  
  spliced_data = [];
  page_event = { pageIndex: 0, pageSize: 0 }

  @ViewChild('messageDlg', { static: false })
  messageDlg: MessageDialogComponent;

  routeParam = [];

  moduleId;
  constructor ( 
    private router: Router,
    private moduleService: ModuleService,
    private processService: ProcessService ) 
  {
      var routerState = this.router.getCurrentNavigation().extras.state
      if( routerState ) {
        if( routerState['moduleId'] ) {
          this.routeParam.push(routerState['moduleId']);
          this.moduleId = routerState['moduleId'];
          //console.log('type ::', typeof(routerState['projectInfo'])); //type is Object
        }
      }
  }

  ngOnInit() {
    if (this.curr_projects.length <= 6) {
      this.spliced_data = this.curr_projects.slice(0).slice(0, 6);
    }
    else {
      this.spliced_data = this.curr_projects.slice(0).slice(0, 12);
    }
	
  }


  pageChangeEvent(event) {
    this.page_event.pageIndex = event.pageIndex
    this.page_event.pageSize = event.pageSize
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.spliced_data = this.curr_projects.slice(offset).slice(0, event.pageSize);
  }

  filterProjectName($event) {
    this.spliced_data = this.curr_projects.filter(s => s.includes($event.target.value))
    if (!$event.target.value) {
      const offset = ((this.page_event.pageIndex + 1) - 1) * this.page_event.pageSize;
      this.spliced_data = this.curr_projects.slice(offset).slice(0, this.page_event.pageSize);
    }
  }

  gotoPage(pageName: string, ele: string) {
    sessionStorage.setItem('name', ele)
    this.router.navigate([pageName])
  }
 
  processId;
  policyData_;
	sendProcessInfo( process: string ) {
    let userDetails = { 'user' : sessionStorage.getItem('name') };
    this.routeParam.push(userDetails);
    let projectInfo = { 'process': process, 'id' : this.curr_projects_map[process] };
    //let projectInfo = { 'process': process };
    this.processId = this.curr_projects_map[process];
    this.routeParam.push( projectInfo );
    let paramInfo = {
      'module_id': this.moduleId ,
      'request_action': this.processId,
      'requested_by': 'Admin'
    };

    
    this.processService.sendProcessDetails( paramInfo, process ).subscribe(
       (response) => { 
          if( response ) { 
            //console.log('response ==>', response);

            if ( process === 'PROCESS_INPUT' ){
              alert( response );
            }
            else if ( process === 'PROCESS_LOGIC' ) {
              this.policyData_ = response;
              alert('Process Logic Completed');
            }
            else  if ( process === 'PROCESS_OUTPUT' ) {
	    	      if( typeof( this.policyData_) == 'string' ) {
			          this.policyData_ = JSON.parse( this.policyData_);
	    	      }
              //this.router.navigate( ['dashboard'], { state : { policyData : this.policyData_ } } );
              this.router.navigate( ['dashboard'], { state : {
                                                        policyData : this.policyData_,
                                                        moduleId : this.moduleId,
                                                        processId: this.curr_projects_map['PROCESS_OUTPUT_FLAG'],
                                                        requested_by: 'Admin'
                                                      } 
              } );
            }
          }
        } ,
       (error) => { 
          console.log('Error ::', error);
          // alert('Error Occurred in Process');
        }
    );    
		
		//this.router.navigate( ['dashboard'], { state : { routeParam : this.routeParam } } );
		
	}

}
