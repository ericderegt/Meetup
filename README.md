# Hipster Code Meetup
### Hipster Code Meetup lets you view the topic & date for the upcoming monthly hipster dev meetup as well as the current headcount of who's attending.

#### Connecting to the program - The IP address for the application is 45.55.169.72. Use port 8000.

#### User commands - a user can access the view, RSVP, and headcount commands.

**view** - the view command lets you see the topic, time, and date of the upcoming meeting.

```bash
view

The next hipster meetup is on 4/10/15 at 6pm. We will be talking about node.js.
```

**RSVP** - the RSVP command lets you RSVP for the upcoming meetup. To do this, enter RSVP followed by your email address and name.

```bash
RSVP eric@gmail.com Eric
```

**headcount** - the headcount command lets you see how many devs are going to the meetup.

```bash
headcount
83 devs are attending the next meetup!
```

#### Admin commands - The admin can access the list, meetup, and clear commands. The admin must enter admin and the admin password before each of these commands. The password will be sent to the admin separately for security reasons.

**meetup** - lets the admin set the date, time, and topic of the upcoming meeting up.

```bash
admin password meetup 4/10/15 6pm node.js

You have set the next meetup to 4/10/15 at 6pm. The topic is node.js. Re-run the command if you want to change any of these details!
```

**list** - lets the admin see the names of attending developers.

```bash
admin password list

Attending developers
- Eric
- John
- Gabby
```

**clear** - lets the admin clear the list of attending developers. Execute this command once your current meetup has finished, otherwise everyone will have to sign up again!

```bash
admin password clear

You have cleared the list of attending developers!
```
