Feature: Inventory Web
    @demo @debug
    Scenario Outline: <TestID>: Interacting with Multiple Elements
        Given As a standard user I login to inventory web App
            | UserType | Username                |
            | StdUser  | standard_user           |
            | ProbUser | problem_user            |
            | PerfUser | performance_glitch_user |

        Then Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price

        Examples:
            | TestID    | NumberOfProducts |
            | INVT_TC001 | 6                |