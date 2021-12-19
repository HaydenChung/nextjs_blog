import { Typography, Paper, Container } from "@material-ui/core"


function About() {
    return (
        <Container>
            <Paper elevation={0} >
                <Typography variant="body2" color="textSecondary" component="p">
                    Name: Hayden
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    What Matters: Follow my path, I want to live a better life than my parents than have a Heir, who I wish live a better life than I do.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    What I do: Full stack programmer
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    How I do it: 
                </Typography>
            </Paper>
        </Container>
    )
}

export default About