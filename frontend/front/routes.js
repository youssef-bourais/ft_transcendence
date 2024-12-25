import { SanitizeInpute, GoLogin, showError, validatePassword, getCookie, deleteCookie, clickEvent, logout} from './utils.js';
import { handleLocation } from './app.js';
import { SecureApiRequest} from './api.js';
import { loadChatInterface } from './chat.js';

{/* <button id='test' style='z-index:10'>hey</button> */}


export const routes = {

    "/" : { 
    html: `
            <div class="cart">
                <h2 class="title"> login </h2>
                <form class="form" id="login-form">
                    <div class="input-group">
                        <label for="username">username</label>
                        <input type="text" name="username" autocomplete="on" id="username" placeholder="Username" required>

                        <div class="form-group">
                            <label for="password">password</label>
                            <input type="password" name="password" autocomplete="on" id="password" placeholder="Password" required>

                            <svg onclick="togglePass('password')" id="Layer_1password" data-name="Layer 1" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-glyph</title><path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z"/></svg>
                            <svg onclick="togglePass('password')" hidden id="Layer_2password" data-name="Layer 2" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-disabled-glyph</title><path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z"/></svg>
                        </div>
                        <div class="forgot">
                            <a rel="noopener noreferrer" href="#" id="forget-passwd" class="inpute" data-view="forget_passwd">forgot password ?</a>
                        </div>
                    </div>
                    <button type="submit" id="login"  data-view="profile">login</button>
                </form>
                
                <div id="errordiv" align="center" style="margin-left: auto; margin-right: auto;"> 
                    <span id="error" style="color: white; display: none"></span> 
                </div>

                <div class="intra">
                    <div class="line"></div>
                    <p class="message">or</p> 
                    <div class="line"></div>
                </div>
                <button id="login-intra" class="inpute" data-view="login_42">login with 42 intra</button>

                <div class="social-icons">
                    <p class="signup"><br/>don't have an account?
                    <a rel="noopener noreferrer" href="#" class="inpute" id="signup-link" data-view="register">sign up</a>
                    </p>
                </div>
            </div>`,
    setup: setupLoginPage,
    },
    "/register" : {
        html: `
            <div class="cart">
                <h2 class="title"> register </h2>
                
                <form class="form" id="register-form">
                    <div class="input-group" id="reg">

                        <label for="username">username</label>
                        <input type="text" name="username" autocomplete="on" id="username" placeholder="username" required>

                        <label for="email">email</label>
                        <input type="text" name="email"  autocomplete="on" id="email" placeholder="email" required>



                        <div class="form-group">
                            <label for="password">password</label>
                            <input type="password" name="password"  autocomplete="on" id="password" placeholder="password" required>

                            <svg onclick="togglePass('password')" id="Layer_1password" data-name="Layer 1" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-glyph</title><path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z"/></svg>
                            <svg onclick="togglePass('password')" hidden id="Layer_2password" data-name="Layer 2" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-disabled-glyph</title><path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z"/></svg>
                        </div>


                        <div class="form-group">
                            <label for="confirm password">confirm password</label>
                            <input type="password" name="confirm password"  autocomplete="on" id="password2" placeholder="confirm password" required>

                        
                            <svg onclick="togglePass('password2')" id="Layer_1password2" data-name="Layer 1" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-glyph</title><path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z"/></svg>
                            <svg onclick="togglePass('password2')" hidden id="Layer_2password2" data-name="Layer 2" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-disabled-glyph</title><path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z"/></svg>
                        </div>


                        <div id="errordiv" align="center" style="margin-left: auto; margin-right: auto;"> 
                            <span id="error" style="color: white; display: none"></span> 
                        </div>

                    </div>

<a href="javascript: history.go(-1)">Back</a>
                    <button class="register">register</button>
                </form>

                
            </div>`,
    setup: setupRegisterPage,
    },
    "/forget_passwd": {
        html: `
            <div class="cart" id="forget-cart">
                <h2 class="title"> Forgot Password ?</h2>
                <form class="form" id="forget-form">
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" autocomplete="on" id="email" placeholder="">
                    </div>
                    <button id="submit">Submit</button>
                </form>
            </div>`,
        setup: setupForgetPasswordPage,
        },
    "/login_42" : {
        html: ``,
        setup: setupLogin42Page,
        },
    
    "/profile" : {
        html:`
                <!-- start edit -->
                <div class="container-edit" id="container-edit">
                    <div class="container-card-edit">
                        <div class="container-icone">
                            <div class="containerInputFile">
                                <img src="" class="avatars" id="img-update"/>
                                <input type="file" id="file-input" style="display: none;"/>
                                <label for="file-input" class="file-label"id="label-input" ></label>
                                <div class="container-flow"> 
                                    <i class="fa-solid fa-upload"></i>
                                </div>
                            </div>
                        </div>
                        <div class="container-card-edit-inputs">
                            <div class="container-each-input">
                                <input type="text" name="" id="usernameIdProfile" placeholder="Updtae your username" required>
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div class="container-each-input">
                                <input type="email" name="" id="emailIdProfile" placeholder="Updtae your email" required>
                                <i class="fa-solid fa-at"></i>
                            </div>
                            <div class="container-each-input">
                                <input type="password" name="" id="passwordIdProfile" placeholder="Updtae your password" required>
                                <i class="fa-solid fa-key"></i>
                            </div>
                            <div class="container-each-input">
                                <input type="password" name="" id="passwordIdProfileConfirme" placeholder="Confirme your username" required>
                                <i class="fa-solid fa-key"></i>
                            </div>
                            
                            <div class="container-each-input2" style="margin-bottom: 25px;">
                                <input  id="check-box" type="checkbox">
                                <label style="margin-left:20px">Enabel auth</label>
                            </div>
                            <div class="errorInput" id="container-error">
                                <p id="error-message" >Error in input</p>
                            </div>
                            <div class="container-save">
                                <button id="cancel">CANCEL</button>
                                <button id="save">SAVE</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            <!-- end edit -->
                <!-- start main -->
                <div class="container-main-home">
                    <div class="child-container-main-home">
                        <!-- start make the left side of main -->
                        <div class="left-side">
                            <div class="title"><p>Settings</p></div>
                            <div class="container-profile">
                                <div class="container-img"><img class="avatars" src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p  class="display-name" >Abdelkarim hajji</p>
                                    <p>settings</p>
                                </div>
                            </div>
                            <div class="container-friends-profiles">
                                <p>Friends</p>
                            </div>
                            <div class="list-friends-profile" id="list-friends-profile">
                                
                            </div>
                        </div>
                        <!-- finish make the left side of main -->

                        <!-- start make the midle of main -->
                        <div class="midle-side">
                            <div class="container-bg">
                                <div class="child-bg">
                                    <img class="avatars" src="./images/avatar.png" alt="karim">
                                </div>
                            </div>
                            <div class="container-update-info">
                                <div class="container-form">
                                    <div class="container-switch">
                                        <div class="profile"><p>Profile</p></div>
                                        <div class="security"><p>Security</p></div>
                                    </div>
                                    <div class="container-inputs" style="height:110px">
                                        <div class="container-input">
                                            <p>Username</p>
                                            <div class="group">
                                                <p id="userNameProfile"></p>
                                                <i class="fa-solid fa-user"></i>
                                            </div>
                                        </div>
                                        <div class="container-input">
                                            <p>Email</p>
                                            <div class="group">
                                                <p id="emailProfile"></p>
                                                <i class="fa-solid fa-user"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container-email">
                                        <p>Password</p>
                                        <div class="group">
                                            <input type="text" disabled  value="************">
                                            <i class="fa-solid fa-at"></i>
                                        </div>
                                    </div>
                                    <div class="container-save">
                                        <button id="edit-profile">Edit profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- finish make the midle of main -->

                        <!-- start make the end of main -->
                        <div class="end-side">
                            <div class="container-profile-left">
                                <div class="child-container-profile-left">
                                    <div class="container-background-profile">
                                        <img src="./images/background.jpg" alt="">
                                        <img class="avatars" src="./images/avatar.png" alt="">
                                    </div>
                                    <div class="container-name-profile-left">
                                        <p  class="display-name">Abdelkarim hajji</p>
                                        <p>Not in your friends list</p>
                                    </div>
                                    <div class="container-send-request">
                                        <div class="container-send"><i class="fa-solid fa-link"></i></i> <p>Chalange</p></div>
                                        <div class="container-block"><i class="fa-solid fa-user-slash"></i><p>Block</p></div>
                                    </div>
                                    <div class="container-history-friends">
                                        <div class="contaienr-history-profile"><p>History</p></div>
                                    </div>
                                    <div class="container-chalange">
                                        <div class="child-container-chalange">
                                            <div class="contaienr-chalange-img-left"><img src="./images/avatar.png" alt=""><p>1</p></div>
                                            <div class="container-VS">VS</div>
                                            <div class="contaienr-chalange-img-right"><p>1</p><img src="./images/avatar.png" alt=""> </div>
                                        </div>
                                        <div class="child-container-chalange">
                                            <div class="contaienr-chalange-img-left"><img src="./images/avatar.png" alt=""><p>1</p></div>
                                            <div class="container-VS">VS</div>
                                            <div class="contaienr-chalange-img-right"><p>1</p><img src="./images/avatar.png" alt=""> </div>
                                        </div>
                                    
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <!-- finish make the end of main -->
                    </div>
                </div>
                <!-- end main -->`,
        setup: setupProfilepage,
    },
    "/bridg" : {
        html :``,
        setup: handleRedirect,
    },
    "/chat" : {
        html : `
        <div class="container-main" id="container-main"><div id="chat-container"></div></div>`, 
        setup: loadChatInterface,
    },
    "/eachprofile" : {
        html : `
        <!-- start edit -->
        <div class="container-edit" id="container-edit">
            <div class="container-card-edit">
                <div class="container-icone">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="container-card-edit-inputs">
                    <div class="container-each-input">
                        <input type="text" name="" id="usernameIdProfile" placeholder="Updtae your username" required>
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="container-each-input">
                        <input type="email" name="" id="emailIdProfile" placeholder="Updtae your email" required>
                        <i class="fa-solid fa-at"></i>
                    </div>
                    <div class="container-each-input">
                        <input type="password" name="" id="passwordIdProfile" placeholder="Updtae your password" required>
                        <i class="fa-solid fa-key"></i>
                    </div>
                    <div class="container-each-input" style="margin-bottom: 10px;">
                        <input type="password" name="" id="passwordIdProfileConfirme" placeholder="Confirme your username" required>
                        <i class="fa-solid fa-key"></i>
                    </div>
                    <div class="errorInput" id="container-error">
                        <p id="error-message" >Error in input</p>
                    </div>
                    <div class="container-save">
                        <button id="cancel">CANCEL</button>
                        <button id="save">SAVE</button>
                    </div>
                </div>
                
            </div>
        </div>
    <!-- end edit -->
        <!-- start main -->
        <div class="container-main-home">
            <div class="child-container-main-home">
                <!-- start make the left side of main -->
                <div class="left-side">
                    <div class="title"><p>Profile</p></div>
                    <div class="container-profile">
                        <div class="container-img"><img class="avatars" src="" alt="" id="imageEachProfile2"></div>
                        <div class="container-name">
                            <p  class="display-name" id="usernmaeEachProfile2"></p>
                            <p>settings</p>
                        </div>
                    </div>
                    <div class="container-friends-profiles">
                        <p>Friends</p>
                    </div>
                    <div class="list-friends-profile">

                    </div>
                </div>
                <!-- finish make the left side of main -->

                <!-- start make the midle of main -->
                <div class="midle-side">
                    <div class="container-bg">
                        <div class="child-bg">
                            <img class="avatars" src=""  id="imageEachProfile">
                        </div>
                    </div>
                    <div class="container-update-info">
                        <div class="container-form">
                            <div class="container-switch">
                                <div class="profile"><p>Profile</p></div>
                                <div class="security"><p>Security</p></div>
                            </div>
                            <div class="container-inputs" style="height:110px">
                                <div class="container-input">
                                    <p>Username</p>
                                    <div class="group">
                                        <p id="usernmaeEachProfile"></p>
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                </div>
                                <div class="container-input">
                                    <p>Email</p>
                                    <div class="group">
                                        <p id="emailEachProfile"></p>
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="container-email">
                                <p>Password</p>
                                <div class="group">
                                    <input type="text" disabled  value="************">
                                    <i class="fa-solid fa-at"></i>
                                </div>
                            </div>
                            <div class="container-save" style="display:none;">
                                <button id="edit-profile">Edit profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- finish make the midle of main -->

                <!-- start make the end of main -->
                <div class="end-side">
                    <div class="container-profile-left">
                        <div class="child-container-profile-left">
                            <div class="container-background-profile">
                                <img src="./images/background.jpg" alt="">
                                <img class="avatars" src="" id="imageEachProfile3" alt="">
                            </div>
                            <div class="container-name-profile-left">
                                <p  class="display-name" id="usernmaeEachProfile3"></p>
                                <p>Not in your friends list</p>
                            </div>
                            <div class="container-send-request">
                                <div class="container-send"><i class="fa-solid fa-link"></i></i> <p>Chalange</p></div>
                                <div class="container-block"><i class="fa-solid fa-user-slash"></i><p>Block</p></div>
                            </div>
                            <div class="container-history-friends">
                                <div class="contaienr-history-profile"><p>History</p></div>
                            </div>
                            <div class="container-chalange">
                                <div class="child-container-chalange">
                                    <div class="contaienr-chalange-img-left"><img src="./images/avatar.png" alt=""><p>1</p></div>
                                    <div class="container-VS">VS</div>
                                    <div class="contaienr-chalange-img-right"><p>1</p><img src="./images/avatar.png" alt=""> </div>
                                </div>
                                <div class="child-container-chalange">
                                    <div class="contaienr-chalange-img-left"><img src="./images/avatar.png" alt=""><p>1</p></div>
                                    <div class="container-VS">VS</div>
                                    <div class="contaienr-chalange-img-right"><p>1</p><img src="./images/avatar.png" alt=""> </div>
                                </div>
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!-- finish make the end of main -->
            </div>
        </div>
        <!-- end main -->
            `, 
        setup:() => console.log("eachprofile veiw...."),
    },
    "/game": {
        html: `
        <div id="app">
        <div class="game-container">
            <div class="canvas-section">
                <div class="controls">
                    <button onclick="game = startGame('1v1')">1 vs 1</button>
                    <button onclick="game = startGame('1vAI')">1 vs AI</button>
                    <button onclick="game = startGame('4player')">4 Players</button>
                </div>
                <canvas id="gameCanvas"></canvas>
            </div>
            <div class="customization-section">
                <div class="customization">
                    <h3>Game Customization</h3>
                    <table>
                        <tr>
                            <td>Ball Speed:</td>
                            <td><input type="number" id="BALL_SPEED" value="5"></td>
                        </tr>
                        <tr>
                            <td>Paddle Speed:</td>
                            <td><input type="number" id="PADDLE_SPEED" value="5"></td>
                        </tr>
                        <tr>
                            <td>Winning Score (1 -> 10):</td>
                            <td><input type="number" id="WINNING_SCORE" value="5"></td>
                        </tr>
                    </table>
                    <button onclick="applySettings()">Apply Settings</button>
                </div>

                <div class="theme-selection">
                    <h3>Select Game Theme</h3>
                    <table>
                        <tr>
                            <td>Background Color:</td>
                            <td>
                                <select id="backgroundColor">
                                    <option value="black">Black</option>
                                    <option value="blue">Blue</option>
                                    <option value="green">Green</option>
                                    <option value="red">Red</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Paddle Color:</td>
                            <td>
                                <select id="paddleColor">
                                    <option value="white">White</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="cyan">Cyan</option>
                                    <option value="magenta">Magenta</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Ball Color:</td>
                            <td>
                                <select id="ballColor">
                                    <option value="white">White</option>
                                    <option value="orange">Orange</option>
                                    <option value="purple">Purple</option>
                                    <option value="pink">Pink</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <button onclick="applyTheme()">Apply Theme</button>
                </div>
                <div class="instructions">
                    <p>Player 1 (Left): W/S</p>
                    <p>Player 2 (Right): ↑/↓</p>
                    <p>Player 3 (Top): A/D</p>
                    <p>Player 4 (Bottom): ←/→</p>
                </div>
            </div>
        </div>
    </div>
        `,
        setup: setupGamePage,
    },
    
   "/tournament" : {
        html : `
            <!-- start main -->
            <div class="container-main-home">
                <div class="child-container-main-home">
                    <!-- start make the left side of main -->
                    <div class="left-side">
                        <div class="titles">
                            <p>Global Ranking</p>
                            <p>Best players</p>
                        </div>
                        <div class="container-best-players">
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div><div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>

                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                            <div class="container-best-player">
                                <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                <div class="container-name">
                                    <p>Abdelkarim hajji</p>
                                    <p>54823XP</p>
                                </div>
                                <div class="container-badge"><img src="./images/prize_winner.svg" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <!-- finish make the left side of main -->

                    <!-- start main the midle side -->
                    <div class="midle-side">
                        <div class="top">
                            <div class="first-halef">
                                <i class="fa-solid fa-arrow-left"></i>
                                <p>Pinger's Room</p>
                            </div>
                            <div class="second-halef">
                                <button>Join tournament</button>
                            </div>
                        </div>
                        <div class="midle">
                            <div class="container-midle">
                                <svg width="90%" height="100%" viewBox="0 0 3768 834"  fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect x="1" y="23" width="694" height="178" rx="89" fill="#D9D9D9" fill-opacity="0.55" stroke="white" stroke-width="2"/>
                                    <rect x="1" y="633" width="694" height="178" rx="89" fill="#D9D9D9" fill-opacity="0.55" stroke="white" stroke-width="2"/>
                                    <rect x="697" y="328" width="694" height="178" rx="89" fill="#D9D9D9" fill-opacity="0.55" stroke="white" stroke-width="2"/>
                                    <rect opacity="0.55" x="1537.5" y="1.5" width="693" height="831" rx="106.5" fill="#D9D9D9" stroke="white" stroke-width="3"/>
                                    <rect x="-1" y="1" width="694" height="178" rx="89" transform="matrix(-1 0 0 1 3766 22)" fill="#D9D9D9" fill-opacity="0.55" stroke="white" stroke-width="2"/>
                                    <rect x="-1" y="1" width="694" height="178" rx="89" transform="matrix(-1 0 0 1 3766 632)" fill="#D9D9D9" fill-opacity="0.55" stroke="white" stroke-width="2"/>
                                    <rect x="-1" y="1" width="694" height="178" rx="89" transform="matrix(-1 0 0 1 3070 327)" fill="#D9D9D9" fill-opacity="0.55" stroke="white" stroke-width="2"/>
                                    <path d="M1056 327V194C1056 150.37 1020.63 115 977 115H696" stroke="white" stroke-opacity="0.55" stroke-width="4"/>
                                    <path d="M2712 327V194C2712 150.37 2747.37 115 2791 115H3072" stroke="white" stroke-opacity="0.55" stroke-width="4"/>
                                    <path d="M1056 507V640C1056 683.63 1020.63 719 977 719H696" stroke="white" stroke-opacity="0.55" stroke-width="4"/>
                                    <path d="M2712 507V640C2712 683.63 2747.37 719 2791 719H3072" stroke="white" stroke-opacity="0.55" stroke-width="4"/>
                                    <path d="M1392 417H1536" stroke="white" stroke-opacity="0.55" stroke-width="4"/>
                                    <path d="M2232 417H2376" stroke="white" stroke-opacity="0.55" stroke-width="4"/>
                                    
                                    <mask id="rounded-mask">
                                        <rect x="30" y="40" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                    </mask>
                                    <image xlink:href="./images/avatar.png" x="30" y="40" width="150" height="150" mask="url(#rounded-mask)" />
                                    <text x="220" y="130" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>

                                    <mask id="rounded-mask2">
                                        <rect x="30" y="650" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                    </mask>
                                    <image xlink:href="./images/avatar.png" x="30" y="650" width="150" height="150" mask="url(#rounded-mask2)" />
                                    <text x="220" y="740" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>
                                    <mask id="rounded-mask3">
                                        <rect x="730" y="345" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                    </mask>
                                    <image xlink:href="./images/avatar.png" x="730" y="345" width="150" height="150" mask="url(#rounded-mask3)" />
                                    <text x="920" y="435" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>
                                    <mask id="rounded-mask4">
                                        <rect x="1690" y="70" width="400" height="400" rx="50%" ry="50%" fill="white"/>
                                    </mask>
                                    <image xlink:href="./images/avatar.png" x="1690" y="70" width="400" height="400" mask="url(#rounded-mask4)" />
                                    <text x="1660" y="585" font-family="Arial" font-size="60" fill="white">Abdelkarim hajji</text>

                                    <mask id="rounded-mask5">
                                        <rect x="2400" y="345" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                    </mask>
                                    <image xlink:href="./images/avatar.png" x="2400" y="345" width="150" height="150" mask="url(#rounded-mask5)" />
                                    <text x="3295" y="130" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>

                                    <mask id="rounded-mask6">
                                        <rect x="3100" y="650" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                    </mask>
                                    <image xlink:href="./images/avatar.png" x="3100" y="650" width="150" height="150" mask="url(#rounded-mask6)" />
                                    <text x="3295" y="745" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>
                                    <mask id="rounded-mask7">
                                        <rect x="3100" y="40" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                    </mask>
                                    <image xlink:href="./images/avatar.png" x="3100" y="40" width="150" height="150" mask="url(#rounded-mask7)" />
                                    <text x="2590" y="435" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>
                                    <defs>
                                    <pattern id="pattern0_677_886" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_677_886" transform="scale(0.00133333)"/>
                                    </pattern>
                                    <pattern id="pattern1_677_886" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image1_677_886" transform="scale(0.00133333)"/>
                                    </pattern>
                                    <pattern id="pattern2_677_886" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image2_677_886" transform="scale(0.00133333)"/>
                                    </pattern>
                                    <pattern id="pattern3_677_886" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image3_677_886" transform="scale(0.00133333)"/>
                                    </pattern>
                                    <pattern id="pattern4_677_886" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image3_677_886" transform="scale(0.00133333)"/>
                                    </pattern>
                                    <pattern id="pattern5_677_886" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image2_677_886" transform="scale(0.00133333)"/>
                                    </pattern>
                                    <pattern id="pattern6_677_886" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image2_677_886" transform="scale(0.00133333)"/>
                                    </pattern>
                                    
                                    </defs>
                                    </svg>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="container-bottom">
                                <div class="container-title"><p>Match details</p></div>
                                <div class="container-details">
                                    <div class="first-side">
                                        <div class="container-row">
                                            <div class="child-container-row">
                                                <div class="first-part">
                                                    <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                                    <p>1</p>
                                                </div>
                                                <div class="second-part">
                                                    <p>VS</p>
                                                    <div class="container-time">20 mints ago</div>
                                                </div>
                                                <div class="third-part">
                                                    <p>1</p>
                                                    <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container-row">
                                            <div class="child-container-row">
                                                <div class="first-part">
                                                    <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                                    <p>1</p>
                                                </div>
                                                <div class="second-part">
                                                    <p>VS</p>
                                                    <div class="container-time">20 mints ago</div>
                                                </div>
                                                <div class="third-part">
                                                    <p>1</p>
                                                    <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div class="second-halef">
                                        <div class="container-row">
                                            <div class="child-container-row">
                                                <div class="first-part">
                                                    <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                                    <p>1</p>
                                                </div>
                                                <div class="second-part">
                                                    <p>VS</p>
                                                    <div class="container-time">20 mints ago</div>
                                                </div>
                                                <div class="third-part">
                                                    <p>1</p>
                                                    <div class="container-img"><img src="./images/avatar.png" alt=""></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- finish main the midle side -->
                </div>
            </div>

            <!-- end main -->
        `, 
        setup:() => console.log("Tournament veiw...."),
    },
   "/OTP" : {
        html : `
            <div class="cart" id="otp-cart">
                <h1 class="title"> OTP</h1>
                <p id=otp-message> ${localStorage.getItem("message")}</p>
                <form class="form" id="forget-form">

                    <div class="otpuserInput">
                        <input class="otpinput" type="text" id='ist' maxlength="1" onkeyup="clickEvent(this,'sec')">
                        <input class="otpinput" type="text" id="sec" maxlength="1" onkeyup="clickEvent(this,'third')">
                        <input class="otpinput" type="text" id="third" maxlength="1" onkeyup="clickEvent(this,'fourth')">
                        <input class="otpinput" type="text" id="fourth" maxlength="1" onkeyup="clickEvent(this,'fifth')">
                        <input class="otpinput" type="text" id="fifth" maxlength="1" onkeyup="clickEvent(this,'sixth')">
                        <input class="otpinput" type="text" id="sixth" maxlength="1">
                    </div>

                <div id="errordiv" align="center" style="margin-left: auto; margin-right: auto;"> 
                    <span id="error" style="color: white; display: none"></span> 
                </div>

                </form>
            </div>`, 
        setup: handleOTPpage,
    },
    "/404": {
        html: `<h1>404: Page Not Found</h1><br><h4>The page you're looking for doesn't exist.</h4>`,
        setup: () => console.log("404 page loaded"),
    },
   
};

function isOnlyDigits(str) {
    return /^\d+$/.test(str);
}

function CleanOTPInput()
{
    const otp = [
        document.getElementById('ist'),
        document.getElementById('sec'),
        document.getElementById('third'),
        document.getElementById('fourth'),
        document.getElementById('fifth'),
        document.getElementById('sixth')
    ];

    otp.forEach(input => {
                input.value = ""; 
    });
    document.getElementById('ist').focus();
}


async function OTPauth(value)
{
    const password = localStorage.getItem("password");
    const UserData = 
    {
        username : localStorage.getItem("username"),
        password : password,
        otp: value
    };       
    console.log("zobi: ", UserData.username, UserData.password, UserData.otp);

    try
    {
        const response = await fetch(`/api/token/`, 
        {
            method : "POST", 
            headers: {
                "Content-Type" : "application/json",
            }, 
            body : JSON.stringify(UserData),
        });

        const data = await response.json();
        if(!response.ok)
        {
            CleanOTPInput();
            showError(data.error);

            if (response.status === 410) 
            {
                setTimeout(() => {
                    history.pushState({}, "", "/");
                    handleLocation();
                }, 3000);
            }
        }
        else
        {
            localStorage.setItem("refreshToken", data.refresh);
            localStorage.setItem("accessToken", data.access);

            const info = await SecureApiRequest(`/api/get/${localStorage.getItem("username")}/`);

            localStorage.setItem("photo", info.photo);
            localStorage.setItem("email", info.email);

            history.pushState({}, "", "/profile"); 
            localStorage.removeItem("password");
            handleLocation();
        }
    }
    catch (error)
    {
        alert("An error occurred. Please try again.");
    }
}


async function handleOTPpage() 
{
    document.getElementById('otp-message').innerText = localStorage.getItem('message');
    document.getElementById('ist').focus();

    document.getElementById('sixth').addEventListener('input', function() {

        const otp = [
            document.getElementById('ist'),
            document.getElementById('sec'),
            document.getElementById('third'),
            document.getElementById('fourth'),
            document.getElementById('fifth'),
            document.getElementById('sixth')
        ];

        const otpValues = otp.map(input => input.value);
        const otpString = otpValues.join('');

        if (!isOnlyDigits(otpString)) 
        {
            showError("OTP must contain only digits.");
            CleanOTPInput();
        } 
        else 
        {
            showError("Sending OTP...");
            OTPauth(otpString);
        }

    });
}

async function getUserData(username)
{
    try
    {
        const response = await fetch(`/api/get/${username}/`);

        if(!response.ok)
        {
            console.error(`2FA : couldnt fetch userdata: ${response.status} - ${response.statusText}`);
            return null;
        }
        else
        {
            const data = await response.json();
            return data;
        }
    }
    catch (error)
    {
        console.error('error fetching user info');
        return null;
    }
}

export function populateProfile() 
{
    const photo = localStorage.getItem("photo");
    const username = localStorage.getItem("username");
    // const email = localStorage.getItem("email");

    const avatar = document.getElementsByClassName("avatars");
    let i = 0;
    while(i < avatar.length)
    {   
        avatar[i].src = photo;
        i++;
    }

    document.querySelectorAll(".display-name").forEach(displayName => {
        console.log("length");
        displayName.innerText = username;
    });
}
populateProfile() 
async function setupLoginPage() 
{
    // logout();
    // console.log("login page");
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (event) => 
    {
        event.preventDefault();
        const UserData = 
        {
            username : SanitizeInpute(document.getElementById("username").value),
            password : SanitizeInpute(document.getElementById("password").value),
        };
        try
        {
            const response = await fetch("/api/token/", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(UserData),
            });

            const data = await response.json();

            if(!response.ok)
                showError("invalid username or passsword");
            else
            {
                localStorage.setItem("message", data.message)
                localStorage.setItem("username", UserData.username);
                localStorage.setItem("password", UserData.password);

                console.log("message: ", data.message);
                const userinfo = await getUserData(UserData.username); 
                if(!userinfo)
                    console.error("An error accurred whene fetching userdata (photo)");

                if(data.access)
                {
                    alert("login successful");
                    localStorage.removeItem("password");

                    localStorage.setItem("accessToken", data.access);
                    localStorage.setItem("refreshToken", data.refresh);
                    localStorage.setItem("email", userinfo.email);
                    localStorage.setItem("photo", userinfo.photo);

                    history.pushState({}, "", "/profile"); 
                    handleLocation();
                }
                else
                {
                    history.pushState({}, "", "/OTP"); 
                    handleLocation();
                }
            }
        }
        catch (error)
        {
            console.error("error login", error);
            alert("An error occurred. Please try again.", error);
        }
    });
}

async function setupRegisterPage() 
{

    console.log("register page");
    const form = document.getElementById("register-form");
    form.addEventListener("submit", async (event) => 
    {
        event.preventDefault(); 
        const UserData = 
        {
            username: SanitizeInpute(document.getElementById("username").value),
            email: SanitizeInpute(document.getElementById("email").value),
            password: SanitizeInpute(document.getElementById("password").value),
            password2: SanitizeInpute(document.getElementById("password2").value),
        };

        // var message = validatePassword(UserData.password, UserData.password2, UserData.email);
        // if(message !== null)
        // {
        //     showError(message);
        //     return;
        // }
        try 
        {
            const response = await fetch("/api/register/", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(UserData),
            });


            const data = await response.json();
            if (response.ok)
            {
            
                alert("User registered successfully!");
                console.log("Registration successful");
                history.pushState({}, "", "/");
                handleLocation();
            }
            else
            {
                let errorMessage = "Registration failed: ";
                for (const key in data) 
                    if (data[key]) 
                        errorMessage += `${key} :${data[key].join(", ")} `;
                errorMessage += "\n\n";
                showError(errorMessage);
            }
        } 
        catch (error) 
        {
            alert("An error occurred. Please try again.");
        }
    });
}

function setupForgetPasswordPage()
{

}

async function setupLogin42Page() 
{
    try 
    {
        const response = await fetch('/api/auth/login/', {
        });

        if (!response.ok) 
            throw new Error('OAuth2 initiation failed + ' + response.status);

        const data = await response.json();

        if (data.redirectUrl) 
        {
            window.location.href = data.redirectUrl;  // Redirect to OAuth2 authorization page
        }
    } 
    catch (error) 
    {
        console.error('Error initiating OAuth2:', error);
        alert('An error occurred while initiating OAuth2. Please try again later.');
    }
}


function decodeImage(photo)
{

    const tempElement = document.createElement('textarea');
    tempElement.innerHTML = photo;

    // Decode the string
    const decodedPhoto = tempElement.value;
    return decodedPhoto;
}

function handleRedirect() 
{
    console.log("bridg====================");
    const access_token = getCookie('access_token');
    deleteCookie("access_token");

    const refresh_token = getCookie('refresh_token');
    deleteCookie("refresh_token");

    const username = getCookie('username')
    deleteCookie('username');

    const photo = getCookie('photo')
    deleteCookie('photo');

    const image = photo ? photo.replace(/^"(.*)"$/, '$1') : null; 

    const email = getCookie('email');
    deleteCookie('email');

    const mail = email ? email.replace(/^"(.*)"$/, '$1') : null; 

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    localStorage.setItem("email", mail);
    localStorage.setItem("username", username);
    localStorage.setItem("photo", image);
    
    // console
    history.pushState({}, "", "/profile");
    handleLocation();
}

async function setupProfilepage()
{

    let data = await SecureApiRequest(`/api/get/${localStorage.getItem("username")}/`);
    console.log("data: ", data.username, data.email, data.photo);
    // const id = data.username;

    // data = await SecureApiRequest(`/api/get/${id}/`);
    // localStorage.setItem('username', data.username);

    // console.log("username", localStorage.getItem("username")); 
        

    // console.log("data from profile: ", data.username, data.email, data.photo);



    // console.log("data, ", localStorage.getItem("photo"));
    // console.log("data, ", localStorage.getItem("email"));
}





const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 15;
let BALL_SPEED = 3;
let PADDLE_SPEED = 8;
let WINNING_SCORE = 20;
let GAME_MODE = '1v1';

// const tutorials = {
//     '1v1': 'This is a 1v1 game mode. Use W/S for Player 1 and Up/Down for Player 2.',
//     '1vAI': 'This is a 1vAI game mode. Use W/S for Player 1 and the AI will control Player 2.',
//     '4player': 'This is a 4 player game mode. Use W/S for Player 1, Up/Down for Player 2, A/D for Player 3, and Left/Right for Player 4.'
// }


// KeyboardController class
class KeyboardController {
    constructor() {
        this.keys = {
            w: false,
            s: false,
            up: false,
            down: false,
            a: false,
            d: false,
            left: false,
            right: false
        };

        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        switch(e.key.toLowerCase()) {
            case 'w': this.keys.w = true; break;
            case 's': this.keys.s = true; break;
            case 'arrowup': this.keys.up = true; break;
            case 'arrowdown': this.keys.down = true; break;
            case 'a': this.keys.a = true; break;
            case 'd': this.keys.d = true; break;
            case 'arrowleft': this.keys.left = true; break;
            case 'arrowright': this.keys.right = true; break;
        }
    }

    handleKeyUp(e) {
        switch(e.key.toLowerCase()) {
            case 'w': this.keys.w = false; break;
            case 's': this.keys.s = false; break;
            case 'arrowup': this.keys.up = false; break;
            case 'arrowdown': this.keys.down = false; break;
            case 'a': this.keys.a = false; break;
            case 'd': this.keys.d = false; break;
            case 'arrowleft': this.keys.left = false; break;
            case 'arrowright': this.keys.right = false; break;
        }
    }
}


// Ball class
class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT / 2;
        if (Math.random() < 0.5) {
            this.dx = BALL_SPEED * 1;
        } else {
            this.dx = -BALL_SPEED * -1;
        }
        this.dy = BALL_SPEED * (Math.random() * 2 - 1);
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off top and bottom
        if (this.y < 0 || this.y > CANVAS_HEIGHT) {
            this.dy *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x - BALL_SIZE/2, this.y - BALL_SIZE/2, BALL_SIZE, BALL_SIZE);
    }
}



// Paddle class
class Paddle {
    constructor(x, y, orientation = 'vertical', isAI = false) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.score = 0;
        this.isAI = isAI;
    }

    update(ball, upKey, downKey) {
        if (this.isAI) {
            this.updateAI(ball);
        } else {
            if (this.orientation === 'vertical') {
                if (upKey && this.y > PADDLE_HEIGHT/2) {
                    this.y -= PADDLE_SPEED;
                }
                if (downKey && this.y < CANVAS_HEIGHT - PADDLE_HEIGHT/2) {
                    this.y += PADDLE_SPEED;
                }
            } else {
                if (upKey && this.x > PADDLE_HEIGHT/2) {
                    this.x -= PADDLE_SPEED;
                }
                if (downKey && this.x < CANVAS_WIDTH - PADDLE_HEIGHT/2) {
                    this.x += PADDLE_SPEED;
                }
            }
        }
    }

    updateAI(ball) {
        // Simple AI: Follow the ball with a slight delay
        const targetY = ball.y;
        if (Math.abs(this.y - targetY) > PADDLE_HEIGHT/4) {
            if (this.y < targetY) {
                this.y += PADDLE_SPEED * 1;
            } else {
                this.y -= PADDLE_SPEED * 1;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        if (this.orientation === 'vertical') {
            ctx.fillRect(this.x - PADDLE_WIDTH/2, this.y - PADDLE_HEIGHT/2, PADDLE_WIDTH, PADDLE_HEIGHT);
        } else {
            ctx.fillRect(this.x - PADDLE_HEIGHT/2, this.y - PADDLE_WIDTH/2, PADDLE_HEIGHT, PADDLE_WIDTH);
        }
    }
}


// Game class && logic
class Game {
    constructor(mode = '1v1') {
        this.mode = mode;
        this.ball = new Ball();
        this.paddles = [];
        this.setupPaddles();
        this.gameOver = false;
    }

    setupPaddles() {
        if (this.mode === '1v1') {
            GAME_MODE = '1v1';
            this.paddles = [
                new Paddle(PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical'),
                new Paddle(CANVAS_WIDTH - PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical')
            ];
        } else if (this.mode === '1vAI') {
            GAME_MODE = '1vAI';
            this.paddles = [
                new Paddle(PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical'),
                new Paddle(CANVAS_WIDTH - PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical', true)
            ];
        } else if (this.mode === '4player') {
            GAME_MODE = '4player';
            this.paddles = [
                new Paddle(PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical'), // Left
                new Paddle(CANVAS_WIDTH - PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical'), // Right
                new Paddle(CANVAS_WIDTH / 2, PADDLE_WIDTH * 2, 'horizontal'), // Top
                new Paddle(CANVAS_WIDTH / 2, CANVAS_HEIGHT - PADDLE_WIDTH * 2, 'horizontal') // Bottom
            ];
        }
    }

    updateGameSettings(settings) {
    
        BALL_SPEED = settings.BALL_SPEED;
        PADDLE_SPEED = settings.PADDLE_SPEED;
        WINNING_SCORE = settings.WINNING_SCORE;
    }

    update(keys) {
        if (this.gameOver) return;

        this.ball.update();
        
        if (this.mode === '1v1') {
            this.paddles[0].update(this.ball, keys.w, keys.s);
            this.paddles[1].update(this.ball, keys.up, keys.down);
        } else if (this.mode === '1vAI') {
            this.paddles[0].update(this.ball, keys.w, keys.s);
            this.paddles[1].update(this.ball);
        } else if (this.mode === '4player') {
            this.paddles[0].update(this.ball, keys.w, keys.s); // Left paddle
            this.paddles[1].update(this.ball, keys.up, keys.down); // Right paddle
            this.paddles[2].update(this.ball, keys.a, keys.d); // Top paddle
            this.paddles[3].update(this.ball, keys.left, keys.right); // Bottom paddle
        }

        this.checkCollisions();
        this.checkScore();
    }

    checkCollisions() {
        this.paddles.forEach(paddle => {
            if (paddle.orientation === 'vertical') {
                if (this.ball.x > paddle.x - PADDLE_WIDTH/2 &&
                    this.ball.x < paddle.x + PADDLE_WIDTH/2 &&
                    this.ball.y > paddle.y - PADDLE_HEIGHT/2 &&
                    this.ball.y < paddle.y + PADDLE_HEIGHT/2) {
                    this.ball.dx *= -1.1;
                    this.ball.dy += (this.ball.y - paddle.y) * 0.1;
                }
            } else {
                if (this.ball.x > paddle.x - PADDLE_HEIGHT/2 &&
                    this.ball.x < paddle.x + PADDLE_HEIGHT/2 &&
                    this.ball.y > paddle.y - PADDLE_WIDTH/2 &&
                    this.ball.y < paddle.y + PADDLE_WIDTH/2) {
                    this.ball.dy *= -1.1;
                    this.ball.dx += (this.ball.x - paddle.x) * 0.1;
                }
            }
        });
    }

    checkScore() {
        if (this.mode === '4player') {
            if (this.ball.y < 0) {
                this.paddles[3].score++; // Bottom player scores
                this.ball.reset();
            } else if (this.ball.y > CANVAS_HEIGHT) {
                this.paddles[2].score++; // Top player scores
                this.ball.reset();
            } else if (this.ball.x < 0) {
                this.paddles[1].score++; // Right player scores
                this.ball.reset();
            } else if (this.ball.x > CANVAS_WIDTH) {
                this.paddles[0].score++; // Left player scores
                this.ball.reset();
            }
        } else {
            if (this.ball.x < 0) {
                this.paddles[1].score++;
                this.ball.reset();
            } else if (this.ball.x > CANVAS_WIDTH) {
                this.paddles[0].score++;
                this.ball.reset();
            }
        }

        this.paddles.forEach(paddle => {
            if (paddle.score >= WINNING_SCORE) {
                this.gameOver = true;
            }
        });
    }

    testBackground(CANVAS_HEIGHT, CANVAS_WIDTH, ctx, theme) {
    
    // Create image objects
    const p1 = new Image();
    const p2 = new Image();
    const p3 = new Image();
    const p4 = new Image();

    // Set image sources
    p1.src = './themes/1.png'; // Replace with your image paths
    p2.src = './themes/2.png'; 
    p3.src = './themes/3.png'; 
    p4.src = './themes/4.png'; 

    // Wait until all images are loaded before drawing them
    let imagesLoaded = 0;
    const images = [p1, p2, p3, p4];
    
    // Increment imageLoaded for each image when it's loaded
    images.forEach((img, index) => {
        img.onload = () => {
            imagesLoaded++;
            // Check if all images are loaded
            if (imagesLoaded === images.length) {
                // All images are loaded, now draw them on the canvas
                ctx.drawImage(p1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw base layer
                ctx.drawImage(p2, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw middle layer
                ctx.drawImage(p3, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw top layer
                ctx.drawImage(p4, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw another top layer
            }
        };
        img.onerror = () => console.error(`Error loading image: ${img.src}`);
    });
}

    
    // Call the function to test it    


    draw(ctx) {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Draw center lines
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.moveTo(CANVAS_WIDTH / 2, 0);
        ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
        ctx.moveTo(0, CANVAS_HEIGHT / 2);
        ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        //this.testBackground(CANVAS_HEIGHT, CANVAS_WIDTH, ctx);

        // Draw game elements
        this.ball.draw(ctx);
        this.paddles.forEach(paddle => paddle.draw(ctx)); 

        // Draw scores
        ctx.font = '32px Arial';
        ctx.fillStyle = '#fff';
        if (this.mode === '4player') {
            // Left player score
            ctx.fillText(this.paddles[0].score, CANVAS_WIDTH/4, CANVAS_HEIGHT/2);
            // Right player score
            ctx.fillText(this.paddles[1].score, 3*CANVAS_WIDTH/4, CANVAS_HEIGHT/2);
            // Top player score
            ctx.fillText(this.paddles[2].score, CANVAS_WIDTH/2, CANVAS_HEIGHT/4);
            // Bottom player score
            ctx.fillText(this.paddles[3].score, CANVAS_WIDTH/2, 3*CANVAS_HEIGHT/4);
        } else {
            ctx.fillText(this.paddles[0].score, CANVAS_WIDTH/4, 50);
            ctx.fillText(this.paddles[1].score, 3*CANVAS_WIDTH/4, 50);
        }

        if (this.gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = '#fff';
            ctx.font = '48px Arial';
            ctx.fillText('Game Over!', CANVAS_WIDTH/2 - 100, CANVAS_HEIGHT/2);
        }

    }
}

function applySettings() {
    const ballSpeed = document.getElementById('BALL_SPEED').value;
    const paddleSpeed = document.getElementById('PADDLE_SPEED').value;
    const winningScore = document.getElementById('WINNING_SCORE').value;
    
    window.gameSettings = {
        BALL_SPEED: parseInt(ballSpeed),
        PADDLE_SPEED: parseInt(paddleSpeed),
        WINNING_SCORE: parseInt(winningScore)
    };
    if(game) {
        updateGameSettings(window.gameSettings);
    }
}
// Game loop

function setupGamePage() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    let game = null;
    const keyboard = new KeyboardController();

    window.startGame = (mode) => {
        game = new Game(mode);
        gameLoop();
    };

    function gameLoop() {
        if (game) {
            game.update(keyboard.keys);
            game.draw(ctx);
        }
        requestAnimationFrame(gameLoop);
    }

    window.updateGameSettings = (settings) => {
        if (game) {
            game.updateGameSettings(settings);
        }
    };
}


