import { SanitizeInpute, GoLogin, showError, validatePassword, getCookie, deleteCookie, clickEvent} from './utils.js';
import { handleLocation } from './app.js';
import { SecureApiRequest} from './api.js';


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
        <div class="container-chat">
        <div class="block-container-nav-bar"></div>
       
        <!-- main -->
        <div class="container-main">
            
            <!-- start top nav bat -->
            <div class="container-top">
                <div class="container-title">
                    <img src="./front/images/Pingo.svg" alt="" srcset="">
                </div>
                <div class="container-search">
                    <div class="search">
                        <input type="search" placeholder="Serach for people" id="input-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <i class="fa-solid fa-delete-left" id="delete"></i> 
                    </div>
                </div>
                
                <div class="container-profile">
                    <div class="profile">
                        <img id="avatars" src="./front/images/avatar.png" alt="">
                        <div class="container-notification">
                            <p>Abdelkarim hajji</p>
                            <p>2 unread notifacation</p>
                        </div>
                        <div class="icon-down">
                            <div class="container-icon">
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- finish end nav bar --> 

            <!-- start main -->
            <div class="container-main-home">
                <div class="child-container-main-home">
                    <!-- start make the left side of main -->
                    <div class="left-side">
                        <div class="title"><p>Settings</p></div>
                        <div class="container-profile">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>settings</p>
                            </div>
                        </div>
                        <div class="container-setting">
                            <div class="container-img"><img src="./front/images/setting.svg" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>Settings about name and password</p>
                            </div>
                        </div>
                    </div>
                    <!-- finish make the left side of main -->

                    <!-- start make the midle of main -->
                    <div class="midle-side">
                        <div class="container-bg">
                            <div class="child-bg">
                                <img src="./front/images/avatar.png" alt="karim">
                            </div>
                        </div>
                        <div class="container-update-info">
                            <div class="container-form">
                                <div class="container-switch">
                                    <div class="profile"><p>Profile</p></div>
                                    <div class="security"><p>Security</p></div>
                                </div>
                                <div class="container-inputs">
                                    <div class="container-input">
                                        <p>First Name</p>
                                        <div class="group">
                                            <input type="text">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                    </div>
                                    <div class="container-input">
                                        <p>Last Name</p>
                                        <div class="group">
                                            <input type="text">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="container-email">
                                    <p>Username</p>
                                    <div class="group">
                                        <input type="text" >
                                        <i class="fa-solid fa-at"></i>
                                    </div>
                                </div>
                                <div class="container-save">
                                    <button><i class="fa-solid fa-check"></i> Save Changes</button>
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
                                    <img src="./front/images/background.jpg" alt="">
                                    <img src="./front/images/avatar.png" alt="">
                                </div>
                                <div class="container-name-profile-left">
                                    <p>Abdelkarim hajji</p>
                                    <p>Not in your friends list</p>
                                </div>
                                <div class="container-send-request">
                                    <div class="container-send"><i class="fa-solid fa-link"></i></i> <p>Chalange</p></div>
                                    <div class="container-block"><i class="fa-solid fa-user-slash"></i><p>Block</p></div>
                                </div>
                                <div class="container-history-friends">
                                    <div class="contaienr-history-profile"><p>History</p></div>
                                    <div class="container-friends-profile"><p>Friends</p></div>
                                </div>
                                <div class="container-chalange">
                                    <div class="child-container-chalange">
                                        <div class="contaienr-chalange-img-left"><img src="./front/images/avatar.png" alt=""><p>1</p></div>
                                        <div class="container-VS">VS</div>
                                        <div class="contaienr-chalange-img-right"><p>1</p><img src="./front/images/avatar.png" alt=""> </div>
                                    </div>
                                    <div class="child-container-chalange">
                                        <div class="contaienr-chalange-img-left"><img src="./front/images/avatar.png" alt=""><p>1</p></div>
                                        <div class="container-VS">VS</div>
                                        <div class="contaienr-chalange-img-right"><p>1</p><img src="./front/images/avatar.png" alt=""> </div>
                                    </div>
                                   
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <!-- finish make the end of main -->
                </div>
            </div>
            <!-- end main -->
        </div>
    </div>





        <!-- <div id="profile-container">
            <div id="avatar-section">

                <img id="avatars" src="./images/42-logo.png" alt="Default Avatar">
                <input type="file" id="avatar-upload" accept="image/*" onchange="uploadAvatar(event)">
            </div>
            <div id="info-section">
                <h2 id="display-name">${localStorage.getItem("username")}</h2>
                <button id="edit-name" onclick="editDisplayName()">Edit</button>
                <p id="stats">
                    Wins: <span id="wins">0</span> | Losses: <span id="losses">0</span>
                </p>
            </div>
            <div id="friends-section">
                <h3>Friends</h3>
                <ul id="friends-list">
                    <li>John Doe <span class="status online">Online</span></li>
                    <li>Jane Smith <span class="status offline">Offline</span></li>
                </ul>
            </div>
            <div id="history-section">
                <h3>Match History</h3>
                <ul id="history-list">
                    <li>1v1 with Jane Smith - Won on 2024-11-25</li>
                    <li>1v1 with John Doe - Lost on 2024-11-20</li>
                </ul>
            </div>
        </div> -->`,
        setup: setupProfilepage,
    },
    "/bridg" : {
        html :``,
        setup: handleRedirect,
    },
    "/chat" : {
        html : `
        <div class="container-chat">
        <div class="block-container-nav-bar"></div>
       
        <!-- main -->
        <div class="container-main">
            
            <!-- start top nav bat -->
            <div class="container-top">
                <div class="container-title">
                    <img src="./front/images/Pingo.svg" alt="" srcset="">
                </div>
                <div class="container-search">
                    <div class="search">
                        <input type="search" placeholder="Serach for people" id="input-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <i class="fa-solid fa-delete-left" id="delete"></i> 
                    </div>
                </div>
                
                <div class="container-profile">
                    <div class="profile">
                        <img  id="avatars" src="./front/images/avatar.png" alt="">
                        <div class="container-notification">
                            <p>Abdelkarim hajji</p>
                            <p>2 unread notifacation</p>
                        </div>
                        <div class="icon-down">
                            <div class="container-icon">
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
            `, 
        setup:() => console.log("chat veiw...."),
    },
    "/game" : {
        html : `<div class="container-chat">
        <div class="block-container-nav-bar"></div>
       
        <!-- main -->
        <div class="container-main">
            
            <!-- start top nav bat -->
            <div class="container-top">
                <div class="container-title">
                    <img src="./front/images/Pingo.svg" alt="" srcset="">
                </div>
                <div class="container-search">
                    <div class="search">
                        <input type="search" placeholder="Serach for people" id="input-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <i class="fa-solid fa-delete-left" id="delete"></i> 
                    </div>
                </div>
                
                <div class="container-profile">
                    <div class="profile">
                        <img id="avatars" src="./front/images/avatar.png" alt="">
                        <div class="container-notification">
                            <p>Abdelkarim hajji</p>
                            <p>2 unread notifacation</p>
                        </div>
                        <div class="icon-down">
                            <div class="container-icon">
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>`, 
        setup:() => console.log("Game veiw...."),
    },
   "/tournament" : {
        html : `
        <div class="container-chat">
    <div class="block-container-nav-bar"></div>
    
    <!-- main -->
    <div class="container-main">
        
        <!-- start top nav bat -->
        <div class="container-top">
            <div class="container-title">
                <img src="./front/images/Pingo.svg" alt="" srcset="">
            </div>
            <div class="container-search">
                <div class="search">
                    <input type="search" placeholder="Serach for people" id="input-search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <i class="fa-solid fa-delete-left" id="delete"></i> 
                </div>
            </div>
            
            <div class="container-profile">
                <div class="profile">
                    <img id="avatars" src="./front/images/avatar.png" alt="">
                    <div class="container-notification">
                        <p>Abdelkarim hajji</p>
                        <p>2 unread notifacation</p>
                    </div>
                    <div class="icon-down">
                        <div class="container-icon">
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- finish end nav bar --> 

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
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>
                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>
                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>
                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>
                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>
                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>
                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div><div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>

                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>
                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
                        </div>
                        <div class="container-best-player">
                            <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                            <div class="container-name">
                                <p>Abdelkarim hajji</p>
                                <p>54823XP</p>
                            </div>
                            <div class="container-badge"><img src="./front/images/prize_winner.svg" alt=""></div>
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
                                <image xlink:href="./front/images/avatar.png" x="30" y="40" width="150" height="150" mask="url(#rounded-mask)" />
                                <text x="220" y="130" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>

                                <mask id="rounded-mask2">
                                    <rect x="30" y="650" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                </mask>
                                <image xlink:href="./front/images/avatar.png" x="30" y="650" width="150" height="150" mask="url(#rounded-mask2)" />
                                <text x="220" y="740" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>
                                <mask id="rounded-mask3">
                                    <rect x="730" y="345" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                </mask>
                                <image xlink:href="./front/images/avatar.png" x="730" y="345" width="150" height="150" mask="url(#rounded-mask3)" />
                                <text x="920" y="435" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>
                                <mask id="rounded-mask4">
                                    <rect x="1690" y="70" width="400" height="400" rx="50%" ry="50%" fill="white"/>
                                </mask>
                                <image xlink:href="./front/images/avatar.png" x="1690" y="70" width="400" height="400" mask="url(#rounded-mask4)" />
                                <text x="1660" y="585" font-family="Arial" font-size="60" fill="white">Abdelkarim hajji</text>

                                <mask id="rounded-mask5">
                                    <rect x="2400" y="345" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                </mask>
                                <image xlink:href="./front/images/avatar.png" x="2400" y="345" width="150" height="150" mask="url(#rounded-mask5)" />
                                <text x="3295" y="130" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>

                                <mask id="rounded-mask6">
                                    <rect x="3100" y="650" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                </mask>
                                <image xlink:href="./front/images/avatar.png" x="3100" y="650" width="150" height="150" mask="url(#rounded-mask6)" />
                                <text x="3295" y="745" font-family="Arial" font-size="50" fill="white">Abdelkarim hajji</text>
                                <mask id="rounded-mask7">
                                    <rect x="3100" y="40" width="150" height="150" rx="50%" ry="50%" fill="white"/>
                                </mask>
                                <image xlink:href="./front/images/avatar.png" x="3100" y="40" width="150" height="150" mask="url(#rounded-mask7)" />
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
                                                <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                                                <p>1</p>
                                            </div>
                                            <div class="second-part">
                                                <p>VS</p>
                                                <div class="container-time">20 mints ago</div>
                                            </div>
                                            <div class="third-part">
                                                <p>1</p>
                                                <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container-row">
                                        <div class="child-container-row">
                                            <div class="first-part">
                                                <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                                                <p>1</p>
                                            </div>
                                            <div class="second-part">
                                                <p>VS</p>
                                                <div class="container-time">20 mints ago</div>
                                            </div>
                                            <div class="third-part">
                                                <p>1</p>
                                                <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div class="second-halef">
                                    <div class="container-row">
                                        <div class="child-container-row">
                                            <div class="first-part">
                                                <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
                                                <p>1</p>
                                            </div>
                                            <div class="second-part">
                                                <p>VS</p>
                                                <div class="container-time">20 mints ago</div>
                                            </div>
                                            <div class="third-part">
                                                <p>1</p>
                                                <div class="container-img"><img src="./front/images/avatar.png" alt=""></div>
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
    </div>
</div>
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
    const email = localStorage.getItem("email");

    const avatar = document.getElementById("avatars");
    if (avatar && photo) 
    {
        avatar.src = photo;
    }

    const displayName = document.getElementById("display-name");
    if (displayName && username) 
    {
        displayName.textContent = username;
    }

    // const displayemail = document.getElementById("display-name");
    // if (displayName && username) 
    // {
    //     displayName.textContent = username;
    // }
}

async function setupLoginPage() 
{
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

                //if is_2f_enabled == false
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

        var message = validatePassword(UserData.password, UserData.password2, UserData.email);
        if(message !== null)
        {
            showError(message);
            return;
        }
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
        console.log("status============", response.status);

        if (!response.ok) 
            throw new Error('OAuth2 initiation failed + ' + response.status);

        const data = await response.json();

        if (data.redirectUrl) 
            window.location.href = data.redirectUrl;  // Redirect to OAuth2 authorization page
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

    const image = photo.replace(/^"(.*)"$/, '$1');

    const email = getCookie('email');
    deleteCookie('email');

    const mail = email.replace(/^"(.*)"$/, '$1');

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    localStorage.setItem("email", mail);
    localStorage.setItem("username", username);
    localStorage.setItem("photo", image);
    
    history.pushState({}, "", "/profile");
    handleLocation();
}

async function setupProfilepage()
{

    // const data = await SecureApiRequest(`/api/get/${localStorage.getItem("username")}/`);

    console.log("data, ", localStorage.getItem("photo"));
    console.log("data, ", localStorage.getItem("email"));


    // document.getElementById('user-id').innerText = data.user.id;
    // document.getElementById('user-username').innerText = data.user.username;
    // document.getElementById('user-email').innerText = data.user.email;
    // document.getElementById('user-photo').src = data.user.photo;

}

