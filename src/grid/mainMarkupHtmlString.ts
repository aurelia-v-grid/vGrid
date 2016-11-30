// tslint:disable:max-line-length
// disabled, since it really wont be easier to read if I change it

export const MainMarkupHtmlString = `
        <avg-top-panel v-drag-drop-col class="avg-top-panel" css="height:$au{avgPanel_Height}px">

        </avg-top-panel>

        <avg-header class="avg-header" css="height:$au{avgHeader_Height}px;top:$au{avgHeader_Top}px">

          <avg-header-left class="avg-header-left" css="width:$au{avgHeaderLeft_Width}px">
           </avg-header-left>  

           <avg-header-main class="avg-header-main" css="left:$au{avgHeaderMain_Left}px;right:$au{avgHeaderMain_Right}px">
             <avg-header-main-scroll css="width:$au{avgHeaderMainScroll_Width}px;height:$au{avgHeaderMainScroll_Height}px"> 
             </avg-header-main-scroll> 
           </avg-header-main> 

           <avg-header-right class="avg-header-right" css="right:$au{avgHeaderRight_Right}px;width:$au{avgHeaderRight_Width}px">
           </avg-header-right> 

        </avg-header>

        <avg-content class="avg-content" css="top:$au{avgContent_Top}px;bottom:$au{avgContent_Bottom}px">
           
            <avg-content-left  class="avg-content-left" css="width:$au{avgContentLeft_Width}px">
              <avg-content-left-scroll css="width:$au{avgContentLeftScroll_Width};height:$au{avgContentLeftScroll_Height}px">  
              </avg-content-left-scroll> 
            </avg-content-left>  

            <avg-content-main  class="avg-content-main" css="left:$au{avgContentMain_Left}px;right:$au{avgContentMain_Right}px">
              <avg-content-main-scroll css="min-width: 100%;width:$au{avgContentMainScroll_Width}px;height:$au{avgContentMainScroll_Height}px"> 
              </avg-content-main-scroll> 
            </avg-content-main> 

            <avg-content-right  class="avg-content-right" css="right:$au{avgContentRight_Right}px;width:$au{avgContentRight_Width}px">
              <avg-content-right-scroll css="width:$au{avgContentRightScroll_Width};height:$au{avgContentRightScroll_Height}px">  
              </avg-content-right-scroll> 
            </avg-content-right>  
            
        </avg-content>

       <avg-footer class="avg-footer" css="height:$au{avgFooter_Height}px">
       </avg-footer> 

       <avg-content-group css="left:0;right:0;top:$au{avgContentGroup_Top}px;bottom:$au{avgContentGroup_Bottom}px">
          <avg-content-group-scroll css="left:0;right:0;height:$au{avgContentGroup_Height}px">  
          </avg-content-group-scroll> 
        </avg-content-group> 

        <avg-content-vhandle css="right:0;bottom:$au{avgContentVhandle_Bottom}px;right:$au{avgContentVhandle_Right}px;left:$au{avgContentVhandle_Left}px;top:$au{avgContentVhandle_Top}px">
          <avg-content-vhandle-scroll css="width:5px;height:$au{avgContentVhandleScroll_Height}px"> 
          </avg-content-vhandle-scroll> 
        </avg-content-vhandle> 

        <avg-content-hhandle css="bottom:$au{avgContentHhandle_Bottom}px;right:$au{avgContentHhandle_Right}px;left:$au{avgContentHhandle_Left}px;height:$au{avgContentHhandle_Height}px">
          <avg-content-hhandle-scroll css="height:7px;width:$au{avgContentHhandleScroll_Width}px"> 
          </avg-content-hhandle-scroll> 
        </avg-content-hhandle> 

        `.replace(/\$(au{)/g, '${');
