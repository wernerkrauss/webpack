<?php
/**
 * Created by PhpStorm.
 * User: gregorweindl
 * Date: 06.08.18
 * Time: 13:29
 */

namespace HSBPage\ElementsControllers;

use DNADesign\Elemental\Controllers\ElementController;
use DNADesign\Elemental\Models\BaseElement;
use Facebook\Facebook;
use Facebook\Exceptions\FacebookResponseException;
use Facebook\Exceptions\FacebookSDKException;
use SilverStripe\ORM\ArrayList;
use SilverStripe\View\ArrayData;
use SilverStripe\View\Requirements;

/**
 * Class FBNewsController
 * @package HSBPage\ElementsControllers
 */

class FBNewsController extends ElementController
{
    public $fb;

    public function init()
    {
        $this->fb = new Facebook([
            'app_id' => $this->config()->get('app_id'),
            'app_secret' => $this->config()->get('app_secret'),
            'default_graph_version' => 'v2.10',
        ]);

        parent::init();
    }

    public function Posts()
    {

        try {

            /**
             * !!!!!!!!!! IF WE NEED VIDEOS WE NEED TO PASS ATTACHMENT AS OPTION TO FIELDS !!!!!!!!!!!!
             */
            $response = $this->fb->get('/me/feed?fields=message,created_time,full_picture,attachments{media,type,video,url}',  $this->config()->get('access_token'));

        } catch (FacebookResponseException $e) {
            // When Graph returns an error
            echo 'Graph returned an error: ' . $e->getMessage();
            exit;
        } catch (FacebookSDKException $e) {
            // When validation fails or other local issues
            echo 'Facebook SDK returned an error: ' . $e->getMessage();
            exit;
        }
        $graphEdge  = $response->getGraphEdge();

        return $this->getFormatedPosts($graphEdge);
    }

    public function getFormatedPosts($graphEdge){

        $Feed = ArrayList::create();


        foreach ($graphEdge  as $graphNode  => $value) {

            $Message = $value->getField('message') != null ? $value->getField('message') : 'Message with no body';
            $Image = $value->getField('full_picture') != null ? $value->getField('full_picture') : null;
            $CreatedAt = $value->getField('created_time') != null ? $value->getField('created_time') : null;
            $Attachments = $value->asArray()['attachments'];
            $AttachmentsCount = count($Attachments);

            $Posts = ArrayData::create([
                'Message' => $Message,
                'Image' => $Image,
                'CreatedAt' => date('d.m.Y', $CreatedAt->getTimestamp())
            ]);

            for($i = 0; $i < $AttachmentsCount; $i++){
                if($Attachments[$i]['type'] === "video_inline"){
                    $url = preg_replace("(^https?://)", "", $Attachments[$i]['url'] );
                    $Posts->setField('VideoURL',$url);
                }
            }

            $Feed->push($Posts);
        }
        return $Feed;
    }

}