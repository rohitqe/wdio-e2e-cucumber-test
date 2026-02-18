Feature:  Web Table Interactions

    @demo
    Scenario Outline: Demo Web Table Interactions

        Given Web Page for Table is opened
        Then Check number of rows and columns
        Then Get whole table data
        Then Get single row [based on a condition]
        Then Get single column
        Then Get single cell value [based on another condition]


        Examples:
            | TestID       |
            | WEBTBL_TC002 |