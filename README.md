# VS code, Angular App and Web Client

  1. [Prerequisites](#Prerequisites)
  2. [Create angular app](#Createangularapp)
  3. [Package angular app](#Packageangularapp)
  4. [Deploy angular app](#Deployangularapp)
  5. [Access angular app](#Accessangularapp)
  6. [Interact with Service Layer](#InteractwithServiceLayer)
  7. [Sample Code](#SampleCode)



##  1. <a name='Prerequisites'>Prerequisites</a>

Before developing the angular app on Web Client, please make sure the Web Client extension development environment is already prepared.

More details about how to prepare the environment, please see [web-client-extension-development-environment.md](./web-client-extension-development-environment.md).



##  2. <a name='Createangularapp'>Create angular app</a>  

Assume you are familiar with the angular app development and you have already know the angular fundamentals.  More details about angular,  please see https://angular.io/.

There are many ways to create an angular app. In this document, the Angular CLI, as a command-line interface tool, is simply used to walk you through the basic steps of creating one angular app. More details, please see: https://angular.io/cli.

1. Open a terminal , install the CLI using the `npm` package manager:

   ```
   npm install -g @angular/cli
   ```

   

2. Create one app named `my-app` with the default options.

   ```
   ng new my-app --defaults
   ```

   This command will create a directory called `my-app` inside the current folder. 

   

3. Navigate into the app folder and run this command to check if it works.

   ```
   cd my-app
   ng serve
   ```

   On success, a browser window pops up to show the app home page. By default, the app runs at this endpoint. 

   ```
   http://localhost:4200
   ```

   If the browser window does not show up, you need to manually open it and visit the above endpoint.

   

4. Build the app.

   ```
   ng build --base-href=./ --prod
   ```

   On success, a `dist/my-app` folder is generated under the `my-app` folder. 

   > **Note:**
   >
   > To configure the app to be served from different path, add a build parameter `--base-href=./`. This will make sure all the asset paths are relative to `index.html`. You will then be able to move the app from `http://mywebsite.com` to `http://mywebsite.com/relativepath` without having to rebuild it.
   >

   

5. Open this project in VS code, the folder structure looks like below:

   ![image-20210414055528122](images/angular-images/image-20210414055528122.png)

   

   

##  3. <a name='Packageangularapp'>Package angular app</a>

1. Go to the workspace folder `my-app`, create a `mta.yaml` file like below.

   ```yaml
   _schema-version: "3.2"
   ID: ext-angular-app
   version: 0.0.1
   provider: SAP
   modules:
   - name: my-angular-app
     type: single-page-app
     path: dist/my-app
   parameters:
     deploy_mode: b1-webclient
   ```

   

   Please be noted the values of some fields are unmodifiable.

   - **_schema-version**

     The `mtar` schema with version 3.2 is used to validate the `mta.yaml`.

   - **modules/type**

     The angular app is categorized as `single-page-app`.

   - **parameters/deploy_mode**

     As the extension is to deploy on web client, `b1-webclient` is used as the deploy mode.

     

   For the modifiable fields as blow, customers can change them according to their specific business scenario.

   - **ID**

     This field is to uniquely identify the extension.

   - **version**

     This field is to uniquely identify the extension version

   - **provider**

     This field is to specify the extension provider.

   - **modules/name**

     This field is to specify the module name.

   - **modules/path**

     This filed is to specify which folder to package. As the angular app build output is in the `dist/my-app` folder, we need to specify the `path` as `dist/my-app` to tell `mbt` the relative location of the app to package.

   

2. Navigate to the folder`dist/my-app` under your project, create the extension configuration file `WebClientExtension.json`, and add the tile information by specifying the tile fields with a meaningful value.

   ```json
   {
     "tiles": [
       {
         "text": "angular-app-webclient",
         "icon": "sap-icon://customize",
         "url": "index.html",
         "subtitle": "Web Client angular Application Extension"
       }
     ]
   }
   ```

   Without this file, a default tile would be created for this app and displayed in the UI, which is less informational and therefore not suggested.

   

   In VS code, the folder structure is as below:

   ![image-20210414055817351](images/angular-images/image-20210414055817351.png)

   > **Note:**
   >
   > For the icon field, only sap icon is supported. More icons, please see: https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons
   >
   > The entry point to load an angular app is `index.html` and it needs to be specified in the `url` field in the `WebClientExtension.json`.

   

3. In a command line terminal, run the following command to do the package.

   ```
   mbt build
   ```

   On success, in the `mta_archives` folder, the `.mtar` file would be generated. 

   ![image-20210414060021152](images/angular-images/image-20210414060021152.png)

   

   > **Note:** 
   >
   > The `mtar` naming convention is `<ID>_<version>.mtar`. The `ID` and `version` can be found in`mta.yaml`.

   

   The package log can be found in the terminal. 

   ![image-20210414095301530](images/angular-images/image-20210414095301530.png)

   

4. (**Optional**) Actually,  the package process can also be accomplished by the **VS Code Multi-Target Application** tool.  The precondition is it is already installed and the `path` environment is correctly configured in the **Environment Setting** section. There are two ways to invoke the package command.

      1. Click **Ctrl + Shift + P**,  input **MTA** and open **Build MTA** to trigger the packaging process.   

         ![image-20210414095428452](images/angular-images/image-20210414095428452.png)

      2. Right Click the `mta.yaml`,  in the context menu, click the **Build MTA** to trigger the packaging process.   

         ![image-20210414095525288](images/angular-images/image-20210414095525288.png)

   

##  4. <a name='Deployangularapp'>Deploy angular app</a>

1. Follow the deployment steps to deploy this `mtar` archive into web client by **Extension Manager**. More details, see **[Deploy mtar files on ExtensionManager.md](https://github.wdf.sap.corp/mcqueen/webclient-extension-sample/blob/master/Deploy%20mtar%20files%20on%20ExtensionManager.md)**.



##  5. <a name='Accessangularapp'>Access angular app</a>

1. Logon to web client, click the extension tab, find the extension and open it.

   ![image-20210414053934993](images/angular-images/image-20210414053934993.png)

   

2. On success, the app is displayed.

   ![image-20210414054313349](images/angular-images/image-20210414054313349.png)



##  6. <a name='InteractwithServiceLayer'>Interact with Service Layer</a>

Considering it is a common requirement to access Service Layer in the extension, in the Web Client context, it is designed to allow customers to interact with Service Layer without login Service Layer. 

Inside the angular app, follow the below steps to manipulate resources from Service Layer.

1. Open `my-app/src/app/app.component.ts`,  add a function `accessServiceLayer` inside  `class AppComponent`to fetch one Business Partner. The code snippet of the entire  `app.component.ts`  is as below:

   ```javascript
   import { Component } from '@angular/core';
   
   @Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.css']
   })
   export class AppComponent {
     title = 'my-app';
     accessServiceLayer() {
       fetch("/b1s/v2/BusinessPartners?$select=CardCode, CardName&$top=1")
       .then(res => res.json())
       .then(
         (result) => {
           alert("Response from Service Layer:\n" + JSON.stringify(result));
         },
         (error) => {
           alert(error);
         }
       )
     }
   }
   
   ```

   

2. Open `my-app/src/app/app.component.html`,  add a button styled `span` with some description text to trigger this function between the `Resources` and the `Next Steps`.

   ```jsx
   <!-- Resources -->
   ...
   
   <h2>Play with Service Layer</h2>
   <p>This is a Web Client extension interacting with Service Layer</p>
   
   <div class="card-container">
       <div class="card card-small" (click)="accessServiceLayer()" tabindex="0">
           <span>Access ServiceLayer</span>
       </div>
   </div>
   
    <!-- Next Steps -->
   ...
   ```

   

3. Repeat the build, package and deployment process, you will find the updated angular app in the Web Client. 

   ![image-20210414232527309](images/angular-images/image-20210414232527309.png)



4. Press the `Access ServiceLayer` button, on success, a Business Partner is returned from Service Layer.



##  7. <a name='SampleCode'>Sample Code</a>

To have a better understanding of this app, the source code and the `mtar` package is also provided in the following links respectively.

- https://github.wdf.sap.corp/mcqueen/webclient-extension-sample/tree/master/src/angular-app-hello-world

- https://github.wdf.sap.corp/mcqueen/webclient-extension-sample/blob/master/mta_archives/ext-angular-app_0.0.1.mtar

