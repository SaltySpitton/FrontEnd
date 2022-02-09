import React from 'react';
import { Link } from 'react-router-dom'
import footLogo from '../images/foot-t-logo.png'

const Layout = ({children}) => {

  return( <> 

        { children }

        <footer>
           <table  className="footerTable">
               <thead>
                   <th><img src={footLogo} alt="Stack Dev Logo" />
                        StackDevHelp
                    </th>
                    
                   <th>Resources</th>                 
                   <th>Creators</th>
                   <tr></tr><tr></tr>
                   
               </thead>
               <tbody>
                   <tr>
                        <td>Questions</td>
                        
                        <td> <a href="https://developer.mozilla.org/en-US/"        target="_blank"> 
                            MDN</a>
                        </td>

                        <td> <a href="http://www.andrewurquhart.com" target="_blank">
                            Andrew</a>
                        </td>
                    </tr>
                   
                   <tr>
                        <td> <a href="https://www.linkedin.com/jobs/search/?keywords=software%20engineer" target="_blank"> 
                            Jobs</a>
                        </td>

                        <td> <a href="https://www.w3schools.com/" target="_blank"> 
                            W3 Schools</a>                        
                        </td>

                        <td>Ali</td>
                   </tr>
                   <tr>
                        <td>User Directory</td>

                        <td> <a href="https://medium.com/" target="_blank">
                            Medium</a>
                        </td>

                        <td>Daniele</td>
                   </tr>
                   <tr>
                        <td>Open Source</td>
                        
                        <td> <a href="https://thehackernews.com/" target="_blank"> 
                            Hacker News</a>
                        </td>

                        <td>Sylvie</td>
                   </tr>
               </tbody>
           </table>
        </footer>
    </>)
}

export default Layout;
