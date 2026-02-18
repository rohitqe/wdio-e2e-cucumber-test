Feature: Demo Feature

    Feature Description
    This is first feature file for my project

    @demo
    Scenario Outline: Run first Demo Feature
        Given Google page is opened
        When Search with <searchItem>
        Then Click on the first search result
        Then URL should match <expectedURL>


        Examples:
            | TestID      | searchItem |        expectedURL     |
            | DEMO_TC001  |     WDIO   |  https://webdriver.io/ |