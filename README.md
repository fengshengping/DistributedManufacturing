Instruction to run Distribution Plan

1. download the server and client code from 
   https://github.com/fengshengping/DistributedManufacturing

2. cd to the server folder from root and run lostNFoundServerHost.exe as administrator
   If your machine has .net framework, you should see,
      LostNFound Service Running at : http://localhost:3600/AdvancedPlanning
      User Admin Service Running at : http://localhost:3600/lostNfoundUser
   else install .net framework in your machine

3. Download node.js 8.11.3 and put it in a folder and set your path to this folder
   run cmd.

4. cd to client folder from root and run
      $npm install
   * if you have not installed node.js yet, please install node.js first

5. run $npm install --global @angular/cli@6.0.8 to install angular cli

6. run $ng serve --port 3000 --open
   then you should see a page as map point to Seattle area 

7. In the page, by default, it allows you to add cutting center to the map by clicking the map. 
   Add 12 or more centers into the map. the max center number is 2 less than the total center and 
   that is fine.

8. switch to add storage on the radio button, and add about 3 or 4 storages to the map

9. Click the Optimize button to optimize it. then you should see a the optimizer 
   will pick up centers that and assign them to the nearest storage so that sum of the 
   travelling distance is the smallest 



