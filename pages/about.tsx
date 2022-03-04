import { Typography, Paper, Container } from "@material-ui/core"


function About() {
    return (
        <Container>
            <Paper elevation={0} >
                <Typography variant="body2" color="textSecondary" component="p">
                    Name: Hayden
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    What Matters: Follow my path, I want to live a better life than my parents than have a kid, who I wish will live a better life than I do.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    What I do: Full stack programmer
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    How I do it: 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    My skillset: 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Drupal 7 / 8 / 9 cms system, modules, RESTful API  design & development.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Build web apps with Reactjs/Vuejs, Nextjs/Nuxtjs, follow Material Design layout, and Typescript support. 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Hybrid mobile apps development with Flutter.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Google suite(Google Docs, Sheet, Gmail,etc) add-on development.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Web games development with Phaser 3.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Version control with Git, CI/CD through Gitlab
                </Typography>
            </Paper>
        </Container>
    )
}

export default About