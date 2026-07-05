Challenge 1: User Account Management
In this challenge, you will create a bash script that provides options for managing user accounts on the system. The script should allow users to perform various user account-related tasks based on command-line arguments.

Part 1: Account Creation
Implement an option -c or --create that allows the script to create a new user account. The script should prompt the user to enter the new username and password.

Ensure that the script checks whether the username is available before creating the account. If the username already exists, display an appropriate message and exit gracefully.

After creating the account, display a success message with the newly created username.

Part 2: Account Deletion
Implement an option -d or --delete that allows the script to delete an existing user account. The script should prompt the user to enter the username of the account to be deleted.

Ensure that the script checks whether the username exists before attempting to delete the account. If the username does not exist, display an appropriate message and exit gracefully.

After successfully deleting the account, display a confirmation message with the deleted username.

Part 3: Password Reset
Implement an option -r or --reset that allows the script to reset the password of an existing user account. The script should prompt the user to enter the username and the new password.

Ensure that the script checks whether the username exists before attempting to reset the password. If the username does not exist, display an appropriate message and exit gracefully.

After resetting the password, display a success message with the username and the updated password.

Part 4: List User Accounts
Implement an option -l or --list that allows the script to list all user accounts on the system. The script should display the usernames and their corresponding user IDs (UID).
Part 5: Help and Usage Information
Implement an option -h or --help that displays usage information and the available command-line options for the script.
