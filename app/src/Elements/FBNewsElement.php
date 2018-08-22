<?php
/**
 * Created by PhpStorm.
 * User: gregorweindl
 * Date: 06.08.18
 * Time: 13:24
 */

namespace HSBPage\Elements;


use DNADesign\Elemental\Models\BaseElement;
use HSBPage\ElementsControllers\FBNewsController;

/**
 * Class \HSBPage\Elements\FBNewsElement
 *
 */
class FBNewsElement extends BaseElement

{
    private static $singular_name = 'FBNewsElement';

    private static $plural_name = 'FBNewsElements';

    private static $description = 'FB News Element';

    private static $table_name = 'FBNewsElement';

    private static $controller_class = FBNewsController::class;

    private static $controller_template = 'FBNewsHolder';

    public function getType()
    {
        return 'FB News Element';
    }
}