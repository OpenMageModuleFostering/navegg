<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to suporte.developer@buscape-inc.com so we can send you a copy immediately.
 *
 * @category   Buscape
 * @package    Buscape_Navegg
 * @copyright  Copyright (c) 2010 Buscapé Company (http://www.buscapecompany.com)
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

class Buscape_Navegg_Block_Page_Head extends Mage_Core_Block_Text
{
    /**
     * Render tracking scripts
     *
     * @return string
     */
    protected function _toHtml()
    {
        if (!Mage::helper('navegg')->isAvailable()) {
            return '';
        }
        
        $html = '<!-- Navegg Code Begin -->';
        
        $html .= '<script id="navegg" type="text/javascript" src="http://navdmp.com/lt.js?'. $this->getNavegg() .'"></script>';
        
        $html .= '<!-- Navegg Code End -->';
        
        return $html;
    }
}