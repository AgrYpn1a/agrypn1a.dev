import styles from './page.module.scss';

// My name is <strong className={styles.highlight}>Rastko</strong> and this is my online space. I am a
// computer programmer with passion for developing software, games and exploring weird areas of computer science and math. I spend my money on
// building and keeping alive an over twenty years old unreliable car with a rotary engine. Beside cars and geek stuff I sometimes like to read,
// create art and listen to music.

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.aboutMe}>
                Welcome to my digital realm. The very purpose of this place is to serve as an informal CV, braindump, blog and whatever else it will evolve to
                be. I am a computer programmer that writes software and develops games. I like to explore math and computer science and discover links between
                the two. I am a humble inquirer into the ancient faith, metaphysics and mystical elements of the world and beyond. My passion is building and
                keeping alive an over twenty years old unreliable car with a rotary engine (thank you Mazda). Sailing the seas of Greece is what helps me reset
                and enjoy life beyond the screen. Beside cars, boats and geek stuff I sometimes like to read, create art and listen to music.
            </div>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.highlightBlock}>CONTACT INFO</span>
                </div>

                <div className={styles.contactInfo}>
                    <div className={styles.contactRow}>
                        <span className={styles.contactLabel}>EMAIL:</span>
                        <a href="mailto:tojagic.rastko@gmail.com" className={styles.contactValue}>
                            tojagic.rastko@gmail.com
                        </a>
                    </div>

                    <div className={styles.contactRow}>
                        <span className={styles.contactLabel}>GITHUB:</span>
                        <a href="https://github.com/agrypn1a" className={styles.contactValue} target="_blank" rel="noopener noreferrer">
                            @agrypn1a
                        </a>
                    </div>

                    <div className={styles.contactRow}>
                        <span className={styles.contactLabel}>LOCATION:</span>
                        <span className={styles.contactValue}>Novi Sad, Serbia</span>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.highlightBlock}>CV</span>
                </div>
                <div>
                    Interested in more formal{' '}
                    <a href="/rastko-tojagic-cv.pdf" className={styles.contactValue} download>
                        CV
                    </a>
                    ?
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.highlightBlock}>PROJECTS</span>
                </div>
                <div className={styles.experienceList}>
                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>
                            <a href="https://github.com/AgrYpn1a/bfme-online" target="_blank" className={styles.contactValue}>
                                The BFME Online
                            </a>
                        </div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>Gamedev</span>
                            <span className={styles.techTag}>Tools</span>
                            <span className={styles.techTag}>Reverse Engineering</span>
                            <span className={styles.techTag}>C#</span>
                            <span className={styles.techTag}>C++</span>
                        </div>
                        <div className={styles.experienceDesc}>
                            The Battle for Middle-Earth community based project intended to restore the original-like online gameplay. All relevant project
                            files are fully open-sourced and available on my{' '}
                            <a href="https://github.com/AgrYpn1a/bfme-online" target="_blank" className={styles.contactValue}>
                                github
                            </a>
                            .
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.highlightBlock}>WORK EXPERIENCE</span>
                </div>
                <div className={styles.experienceList}>
                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Senior Frontend Engineer @ The Digital Factory</div>
                        <div className={styles.experiencePeriod}>2024 - Present</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>Web app</span>
                            <span className={styles.techTag}>JavaScript</span>
                            <span className={styles.techTag}>React</span>
                            <span className={styles.techTag}>Redux</span>
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Senior Frontend Engineer @ Hotovo</div>
                        <div className={styles.experiencePeriod}>2022 - 2024</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>Web app</span>
                            <span className={styles.techTag}>JavaScript</span>
                            <span className={styles.techTag}>Typescript</span>
                            <span className={styles.techTag}>React</span>
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Software Engineer @ Fluxon</div>
                        <div className={styles.experiencePeriod}>2021 - 2022</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>Web app</span>
                            <span className={styles.techTag}>SDK</span>
                            <span className={styles.techTag}>JavaScript</span>
                            <span className={styles.techTag}>Typescript</span>
                            <span className={styles.techTag}>React</span>
                            <span className={styles.techTag}>Next JS</span>
                            <span className={styles.techTag}>Firebase</span>
                            <span className={styles.techTag}>Nest JS</span>
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>C++ Programmer @ Ubisoft</div>
                        <div className={styles.experiencePeriod}>2020 - 2021</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>UI</span>
                            <span className={styles.techTag}>Gameplay</span>
                            <span className={styles.techTag}>C++</span>
                            <span className={styles.techTag}>Ubisoft Anvil</span>
                            <span className={styles.techTag}>Ubisoft Sharpmake</span>
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Game developer generalist @ The Logos Vision</div>
                        <div className={styles.experiencePeriod}>2017 - 2020</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>Gameplay</span>
                            <span className={styles.techTag}>C++</span>
                            <span className={styles.techTag}>Unreal Engine 4</span>
                            <span className={styles.techTag}>C#</span>
                            <span className={styles.techTag}>Unity 3D</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.highlightBlock}>PROJECTS</span>
                </div>
                <div className={styles.experienceList}>
                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>
                            <a href="https://github.com/AgrYpn1a/bfme-online" target="_blank" className={styles.contactValue}>
                                The BFME Online
                            </a>
                        </div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>C#</span>
                            <span className={styles.techTag}>C++</span>
                            <span className={styles.techTag}>Reverse Engineering</span>
                        </div>
                        <div className={styles.experienceDesc}>
                            The Battle for Middle-Earth community based project intended to restore the original-like online gameplay. This one of the projects
                            I am specially proud of even though I have not achieved all that I have planned. Thankfully, the other members of the community took
                            over and with my contribution were able to finalise their project similar in spirit. I have gained a vast range of experience
                            working on this project:
                            <ul>
                                <li>.NET desktop application development (The BFME Online Launcher)</li>
                                <li>Developing the online services using Virtual LAN emulators</li>
                                <li>
                                    Reverse engineering: harvesting the game data from RAM and writing a piece of code that fetches such information
                                    continuously; this was used to determinne the winning player
                                </li>
                            </ul>
                            I have fully open-sourced all related project files and they can be found on my github.
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Superlayer SDK and TAKI platform</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>C#</span>
                            <span className={styles.techTag}>C++</span>
                            <span className={styles.techTag}>Reverse Engineering</span>
                        </div>
                        <div className={styles.experienceDesc}>
                            My primary focus on this project was the research and development of the token bonding curve which defines the relationship between
                            the supply and price for virtual currency. I had to calculate the proper curve approximation and write a module in JS in a
                            functional manner that computes various information about the curve, such as the supply, the price for buy / sell and similar.
                            Alongside I was programming standard CRUD operations between the layers of the app using NestJS and PostgreSQL as the SDKs primary
                            tech stack. TAKI, the SDK consumer project, is a crypto based platform for content creators that we have been developing as a proof
                            of concept in ReactJS and Firebase. I was heavily involved with frontend development of TAKI.
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.highlightBlock}>WORK EXPERIENCE</span>
                </div>

                <div className={styles.experienceList}>
                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Senior Frontend Engineer @ The Digital Factory</div>
                        <div className={styles.experiencePeriod}>2024 - Present</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>JavaScript</span>
                            <span className={styles.techTag}>React</span>
                            <span className={styles.techTag}>Redux</span>
                        </div>
                        <div className={styles.experienceDesc}>
                            Working on company and accounting management software for French startup called{' '}
                            <a href="https://hiway.fr/" target="_blank" className={styles.contactValue}>
                                Hiway
                            </a>
                            . Developing new features and helping maintain and improve the ever growing code base.
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Senior Frontend Engineer @ Hotovo</div>
                        <div className={styles.experiencePeriod}>2022 - 2024</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>JavaScript</span>
                            <span className={styles.techTag}>Typescript</span>
                            <span className={styles.techTag}>React</span>
                        </div>
                        <div className={styles.experienceDesc}>
                            In Hotovo I had the opportunity to work on Enterprise Risk Management (ERM) and Asset Liability Management (ALM) softwares owned by
                            The Protecht Group. ERM and ALM are large scale systems relying on ReactJS for rendering the UI in the web browser. I was involved
                            in developing new and maintaining existing features in both projects and a common ui library shared between them. As a consequence I
                            had to master additional tools such as Rollup and various configurations in order to optimize and properly bundle the ever growing
                            ui-library.
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Software Engineer @ Fluxon</div>
                        <div className={styles.experiencePeriod}>2021 - 2022</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>JavaScript</span>
                            <span className={styles.techTag}>Typescript</span>
                            <span className={styles.techTag}>React</span>
                            <span className={styles.techTag}>Next JS</span>
                            <span className={styles.techTag}>Firebase</span>
                            <span className={styles.techTag}>Nest JS</span>
                        </div>
                        <div className={styles.experienceDesc}>
                            In this company I gained fully remote work experience. I also switched to web development and it was completely unintentional! I
                            have been working on a few different projects with various technologies involved.
                            <ul>
                                <li>Front-end web app development in React, Firebase</li>
                                <li>Back-end web app development in Node (NestJS)</li>
                                <li>Research and development of the Token Bonding Curve for crypto currency based platform</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>C++ Programmer @ Ubisoft</div>
                        <div className={styles.experiencePeriod}>2020 - 2021</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>C++</span>
                            <span className={styles.techTag}>MS Visual Studio</span>
                            <span className={styles.techTag}>Ubisoft Anvil</span>
                            <span className={styles.techTag}>Ubisoft Sharpmake</span>
                        </div>
                        <div className={styles.experienceDesc}>
                            Working for Ubisoft was quite an experience! Unfortunately, due to personal reasons I had to quit the job early. I have been working
                            on general gameplay features, hunting and fixing bugs and more. I worked on online multiplayer battle royale game - code named
                            PATHFINDER.
                            <br />
                            <br />
                            The feature that I am specially proud of is the development of tactical map. It was the feature I owned and developed fully in
                            cooperation with the design team and another colleague from programming team. I was again able to apply some of math knowledge I
                            picked up from the universty. In order to pan, rotate and zoom the map, I had to write certain trigonometrical equations to achieve
                            the desired look and feel.
                        </div>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceTitle}>Game development @ The Logos Vision</div>
                        <div className={styles.experiencePeriod}>2017 - 2020</div>
                        <div className={styles.experienceTech}>
                            <span className={styles.techTag}>C++</span>
                            <span className={styles.techTag}>MS Visual Studio</span>
                            <span className={styles.techTag}>Unreal Engine 4</span>
                            <span className={styles.techTag}>C#</span>
                            <span className={styles.techTag}>Unity 3D</span>
                        </div>
                        <div className={styles.experienceDesc}>
                            On a second year of my studies, without previous work experience, I joined the company for an internship. I was given an offer to
                            stay and work alongside my studies with flexible working hours. In this company I gained my first experience working on an actual
                            product and within the team.
                            <br />
                            <br />
                            My responsibility was to implement all technical requirements, writing code and working inside game engine. During my time at The
                            Logos Vision I have worked on two different projects, with different tech stack.
                            <br />
                            <br />
                            <ul>
                                <li>I worked on 3d action / rpg game in Unreal Engine 4 which was primarily written in C++.</li>
                                <li>
                                    I worked on an endless runner game in Unity, written in C#. Here I was able to successfuly apply the concept of Noam
                                    Chomsky's generative grammars to secure mathematically precise and bug-free endless terrain generation with various
                                    obstacles.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
              * */}

            <footer className={styles.footer}>
                <div className={styles.footerText}>© {new Date().getFullYear()} Rastko Tojagic</div>
                <div className={styles.footerText}>
                    Powered by{' '}
                    <a href="https://github.com/rasendubi/uniorg" className={styles.contactValue} target="_blank" rel="noopener noreferrer">
                        uniorg
                    </a>
                </div>
                <div className={styles.asciiLine}>└──────────────────────────────┘</div>
            </footer>
        </div>
    );
}
