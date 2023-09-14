import React, { Component } from 'react';
import * as AppGeneral from '../socialcalc/AppGeneral';
import { DATA } from '../app-data.js';
import './App.css';

import Menu from '../Menu/Menu';
import Files from '../Files/Files';

// import '@ionic/react/css/core.css';

// /* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';
// import { Outlet } from 'react-router-dom';
// import { setupIonicReact } from '@ionic/react';

// import '../theme/variables.css';

// setupIonicReact();

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {selectedFile: "default" , device: AppGeneral.getDeviceType() , listFiles: false };
    this.updateSelectedFile = this.updateSelectedFile.bind(this);
    this.toggleListFiles = this.toggleListFiles.bind(this);
  }

  updateSelectedFile(selectedFile){
    this.setState({
      selectedFile: selectedFile
    });
  }

  toggleListFiles(){
    this.setState(prevState => ({
      listFiles: !prevState.listFiles
    }));
  }

  componentDidMount(){
    let data = DATA['home'][this.state.device]['msc'];
    AppGeneral.initializeApp(JSON.stringify(data));
  }

  activateFooter(footer){
    // console.log("Button pressed! "+footer);
    AppGeneral.activateFooterButton(footer);
  }

  render() {
    let footers = DATA['home'][this.state.device]['footers'];
    
    let footersList = footers.map((footerArray, i) => {
        // console.log(footerArray.name);
        // console.log(footerArray.index);
        return <button className="button button-outline" key={footerArray.index} onClick={() => this.activateFooter(footerArray.index)}> {footerArray.name} </button>
        
    });

    return (
      <div className="App">
        <div className="App-header"> 
          <span>Editing: { this.state.selectedFile } </span>
          <button className="App-list" onClick={ this.toggleListFiles } >List Files</button> 
          
        </div>
        <div className="App-menu"> <Menu file={this.state.selectedFile} updateSelectedFile={this.updateSelectedFile} /> </div>
        <ul className="App-footers"> { footersList } </ul>
        <div id="workbookControl"></div>
        <div id="tableeditor">editor goes here</div> 
        <div id="msg"></div> 
        {this.state.listFiles ? <div className="App-files"> 
                                <Files file={this.state.selectedFile} updateSelectedFile={this.updateSelectedFile}/> </div> : null} 
      {/* <Outlet></Outlet> */}
      </div>
    );
  }
}

export default App;
