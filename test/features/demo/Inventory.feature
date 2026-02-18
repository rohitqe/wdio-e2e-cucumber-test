Feature: Inventory Web
    @demo
    Scenario Outline: Interacting with Multiple Elements
        Given Login to inventory web App
        Then Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price

        Examples:
            | Test ID    | NumberOfProducts |
            | INVT_TC001 | 6                |