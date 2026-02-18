Feature: Web Interactions

    @smoke
    Scenario Outline: Demo Web Interaction

        Given Web Page is opened
        When Perform Web Interactions

        Examples:
            | TestID    |
            | WEB_TC002 |